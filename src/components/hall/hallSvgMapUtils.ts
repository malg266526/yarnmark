import type { AssignedStandVendors } from '../../domain/vendorApplications/assignedStandsApi.ts';
import { resolveApiAssetUrl } from '../../domain/apiClient.ts';
import type { TooltipAlign, TooltipPlacement, TooltipPosition } from '../tooltip/tooltipTypes.ts';
import { GRID_COLS, GRID_ROWS } from '../editor/utils/hallGeometry.ts';
import type { HallStand } from './hallStands.ts';
import { HALL_SVG_MAP_DESIGN, HALL_SVG_MAP_STAND_COLORS } from './hallSvgMapDesign.ts';

const BILINGUAL_LABEL_SEPARATOR = ' / ';
const ENGLISH_LANGUAGE_PREFIX = 'en';
const FONT_SIZE_PRECISION = 10;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//;

export interface HallSvgMapLabelFit {
  fontSize: number;
  lines: string[];
}

export interface HallSvgMapLogoLayout {
  href: string;
  name: string;
  x: number;
  y: number;
  size: number;
  index: { text: string; y: number; fontSize: number } | null;
}

export interface HallSvgMapStandLayout {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  fill: string;
  fontSize: number;
  index: { text: string; y: number } | null;
  label: { lines: string[]; y: number } | null;
  logo: HallSvgMapLogoLayout | null;
}

export interface HallSvgMapLayout {
  width: number;
  height: number;
  stands: HallSvgMapStandLayout[];
}

export const applyAssignedStandVendors = (
  stands: readonly HallStand[],
  assignedVendors: AssignedStandVendors
): HallStand[] =>
  stands.map((stand) => {
    const assignedVendor = assignedVendors.get(stand.index);

    return assignedVendor
      ? { ...stand, vendor: assignedVendor.storeName, vendorLogoUrl: assignedVendor.logoUrl ?? undefined }
      : stand;
  });

export const resolveHallSvgMapLogoUrl = (logoUrl: string | undefined): string | null =>
  logoUrl && ABSOLUTE_URL_PATTERN.test(logoUrl) ? logoUrl : resolveApiAssetUrl(logoUrl);

export const getHallSvgMapLogoLayout = (
  stand: Pick<HallStand, 'index'>,
  href: string,
  name: string,
  showIndex: boolean,
  frame: { x: number; y: number; width: number; height: number }
): HallSvgMapLogoLayout => {
  const { maxFontSize, baselineOffsetEm, logoSizeRatio, logoGap } = HALL_SVG_MAP_DESIGN;
  const indexHeight = showIndex ? maxFontSize + logoGap : 0;
  const size = logoSizeRatio * Math.min(frame.width, frame.height - indexHeight);
  const top = frame.y + (frame.height - indexHeight - size) / 2;

  return {
    href,
    name,
    x: frame.x + (frame.width - size) / 2,
    y: top + indexHeight,
    size,
    index: showIndex ? { text: stand.index, y: top + maxFontSize * baselineOffsetEm, fontSize: maxFontSize } : null
  };
};

const roundFontSize = (fontSize: number) => Math.round(fontSize * FONT_SIZE_PRECISION) / FONT_SIZE_PRECISION;

export const getHallSvgMapStandLabel = (stand: Pick<HallStand, 'vendor' | 'description'>, language: string) => {
  const text = stand.vendor ?? stand.description ?? '';
  const parts = text.split(BILINGUAL_LABEL_SEPARATOR);
  const localized = language.startsWith(ENGLISH_LANGUAGE_PREFIX) ? (parts[1] ?? parts[0]) : parts[0];

  return localized.trim();
};

export const wrapHallSvgMapLabel = (text: string, availableWidth: number, fontSize: number): string[] => {
  if (!text) {
    return [];
  }

  const maxChars = Math.floor(availableWidth / (fontSize * HALL_SVG_MAP_DESIGN.averageCharWidthEm));

  if (text.length <= maxChars) {
    return [text];
  }

  const [firstWord, ...words] = text.split(' ');
  const lines: string[] = [];
  let currentLine = firstWord;

  words.forEach((word) => {
    if (`${currentLine} ${word}`.length <= maxChars) {
      currentLine = `${currentLine} ${word}`;
      return;
    }

    lines.push(currentLine);
    currentLine = word;
  });

  lines.push(currentLine);

  return lines;
};

export const fitHallSvgMapLabel = (
  text: string,
  showIndex: boolean,
  standWidth: number,
  standHeight: number
): HallSvgMapLabelFit => {
  const { maxFontSize, minFontSize, fontSizeStep, lineHeightEm, averageCharWidthEm } = HALL_SVG_MAP_DESIGN;
  let fontSize: number = maxFontSize;
  let lines = wrapHallSvgMapLabel(text, standWidth - 2, fontSize);

  while (fontSize > minFontSize) {
    const blockHeight = (showIndex ? fontSize : 0) + lines.length * fontSize * lineHeightEm;
    const longestLine = Math.max(0, ...lines.map((line) => line.length));
    const blockWidth = longestLine * fontSize * averageCharWidthEm;

    if (blockHeight < standHeight - 1 && blockWidth < standWidth - 1) {
      break;
    }

    fontSize = roundFontSize(fontSize - fontSizeStep);
    lines = wrapHallSvgMapLabel(text, standWidth - 1, fontSize);
  }

  return { fontSize, lines };
};

export const getHallSvgMapStandLayout = (stand: HallStand, language: string): HallSvgMapStandLayout => {
  const { scale, padding, baselineOffsetEm } = HALL_SVG_MAP_DESIGN;
  const x = stand.start.col * scale + padding;
  const y = stand.start.row * scale + padding;
  const width = (stand.end.col - stand.start.col + 1) * scale;
  const height = (stand.end.row - stand.start.row + 1) * scale;
  const showIndex = stand.type !== 'other';
  const labelText = getHallSvgMapStandLabel(stand, language);
  const { fontSize, lines } = fitHallSvgMapLabel(labelText, showIndex, width, height);
  const logoHref = resolveHallSvgMapLogoUrl(stand.vendorLogoUrl);

  const blockHeight = (showIndex ? fontSize : 0) + lines.length * fontSize;
  const indexY = y + (height - blockHeight) / 2 + fontSize * baselineOffsetEm;
  const labelY = showIndex ? indexY + fontSize : indexY;

  return {
    id: stand.id,
    x,
    y,
    width,
    height,
    centerX: x + width / 2,
    fill: HALL_SVG_MAP_STAND_COLORS[stand.color],
    fontSize,
    index: showIndex ? { text: stand.index, y: indexY } : null,
    label: lines.length > 0 ? { lines, y: labelY } : null,
    logo: logoHref ? getHallSvgMapLogoLayout(stand, logoHref, labelText, showIndex, { x, y, width, height }) : null
  };
};

export const getHallSvgMapLayout = (stands: readonly HallStand[], language: string): HallSvgMapLayout => {
  const { scale, padding } = HALL_SVG_MAP_DESIGN;

  return {
    width: GRID_COLS * scale + padding * 2,
    height: GRID_ROWS * scale + padding * 2,
    stands: stands.map((stand) => getHallSvgMapStandLayout(stand, language))
  };
};

export interface HallSvgMapTooltipAnchor {
  top: number;
  bottom: number;
  centerX: number;
}

export const getHallSvgMapTooltipPosition = (
  anchor: HallSvgMapTooltipAnchor,
  map: Pick<HallSvgMapLayout, 'width' | 'height'>
): TooltipPosition => {
  const { tooltipMinSpaceAbove, tooltipEdgeAlignRatio } = HALL_SVG_MAP_DESIGN;
  const placement: TooltipPlacement = anchor.top < tooltipMinSpaceAbove ? 'below' : 'above';
  const anchorY = placement === 'above' ? anchor.top : anchor.bottom;
  const horizontalRatio = anchor.centerX / map.width;
  const align: TooltipAlign =
    horizontalRatio < tooltipEdgeAlignRatio ? 'start' : horizontalRatio > 1 - tooltipEdgeAlignRatio ? 'end' : 'center';

  return {
    leftPercent: horizontalRatio * 100,
    topPercent: (anchorY / map.height) * 100,
    placement,
    align
  };
};
