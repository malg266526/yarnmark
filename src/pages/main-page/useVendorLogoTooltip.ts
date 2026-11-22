import { useCallback, useState } from 'react';
import { TOOLTIP_MAX_WIDTH } from '../../components/tooltip/Tooltip.styled';
import type { TooltipPosition } from '../../components/tooltip/tooltipTypes';
import { getTooltipAlignInViewport } from '../../components/tooltip/tooltipUtils';

interface VendorLogoTooltipState {
  logoUrl: string;
  position: TooltipPosition;
}

export const useVendorLogoTooltip = () => {
  const [tooltip, setTooltip] = useState<VendorLogoTooltipState | null>(null);

  const showLogoTooltip = useCallback((logoUrl: string, logoElement: HTMLElement) => {
    const { left, width } = logoElement.getBoundingClientRect();
    const align = getTooltipAlignInViewport(left + width / 2, document.documentElement.clientWidth, TOOLTIP_MAX_WIDTH);

    setTooltip({ logoUrl, position: { leftPercent: 50, topPercent: 0, placement: 'above', align } });
  }, []);

  const hideLogoTooltip = useCallback(
    (logoUrl: string) => setTooltip((current) => (current?.logoUrl === logoUrl ? null : current)),
    []
  );

  return { tooltip, showLogoTooltip, hideLogoTooltip };
};
