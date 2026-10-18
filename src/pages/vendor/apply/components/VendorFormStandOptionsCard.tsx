import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  LegendCard,
  StandOptionItem,
  StandOptionLabel,
  StandOptionPairToggle,
  StandOptionsEmpty,
  StandOptionsList
} from '../VendorFormPage.styled';
import { STAND_OPTION_SEPARATOR } from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import { canStandBePaired } from '../../../../domain/vendorApplications/vendorStandTypeUtils.ts';

interface VendorFormStandOptionsCardProps {
  onSetStandOptionPaired: (optionIndex: number, isPaired: boolean) => void;
  pairingStandId: string | null;
  preferredStandGroups: string[][];
  unpairableStandIds: string[];
}

export const VendorFormStandOptionsCard = ({
  onSetStandOptionPaired,
  pairingStandId,
  preferredStandGroups,
  unpairableStandIds
}: VendorFormStandOptionsCardProps) => {
  const t = useTypedTranslation();

  return (
    <LegendCard aria-label={t('vendorsFormPage.steps.preferredStands.optionsTitle')}>
      <Typography size="sm" weight="bold">
        {t('vendorsFormPage.steps.preferredStands.optionsTitle')}
      </Typography>
      {preferredStandGroups.length === 0 ? (
        <StandOptionsEmpty>{t('vendorsFormPage.steps.preferredStands.optionsEmpty')}</StandOptionsEmpty>
      ) : (
        <StandOptionsList>
          {preferredStandGroups.map((standGroup, optionIndex) => {
            const [firstStandId] = standGroup;
            const isPaired = standGroup.length > 1;
            const isPairing = !isPaired && firstStandId === pairingStandId;
            const isPairDisabled = !isPaired && !isPairing && unpairableStandIds.includes(firstStandId);
            const toggleId = `vendor_stand_option_pair_${optionIndex}`;

            return (
              <StandOptionItem key={standGroup.join('-')}>
                <StandOptionLabel>
                  {t(
                    isPairing
                      ? 'vendorsFormPage.steps.preferredStands.optionIncomplete'
                      : 'vendorsFormPage.steps.preferredStands.optionLabel',
                    { number: optionIndex + 1, stands: standGroup.join(STAND_OPTION_SEPARATOR) }
                  )}
                </StandOptionLabel>
                {isPaired || canStandBePaired(firstStandId) ? (
                  <StandOptionPairToggle htmlFor={toggleId} $disabled={isPairDisabled}>
                    <input
                      id={toggleId}
                      type="checkbox"
                      checked={isPaired || isPairing}
                      disabled={isPairDisabled}
                      onChange={(event) => onSetStandOptionPaired(optionIndex, event.target.checked)}
                    />
                    <span>{t('vendorsFormPage.steps.preferredStands.addSecondStand')}</span>
                  </StandOptionPairToggle>
                ) : null}
              </StandOptionItem>
            );
          })}
        </StandOptionsList>
      )}
    </LegendCard>
  );
};
