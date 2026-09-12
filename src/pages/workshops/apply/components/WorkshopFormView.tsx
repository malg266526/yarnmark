import React from 'react';
import { FormCard, FormLayout } from '../WorkshopFormPage.styled';
import { WorkshopFormAdditionalInfoSection } from './WorkshopFormAdditionalInfoSection';
import { WorkshopFormBasicsSection } from './WorkshopFormBasicsSection';
import { WorkshopFormContactSection } from './WorkshopFormContactSection';
import { WorkshopFormDescriptionSection } from './WorkshopFormDescriptionSection';
import { WorkshopFormLogisticsSection } from './WorkshopFormLogisticsSection';
import { WorkshopFormLogoSection } from './WorkshopFormLogoSection';
import { WorkshopFormParticipantsSection } from './WorkshopFormParticipantsSection';
import { WorkshopFormPricingSection } from './WorkshopFormPricingSection';
import { WorkshopFormSubmissionSection } from './WorkshopFormSubmissionSection';
import { WorkshopFormSummary } from './WorkshopFormSummary';
import type { WorkshopFormViewProps } from './workshopFormViewContracts';

export const WorkshopFormView = ({ formActions, formBindings, formStatus }: WorkshopFormViewProps) => (
  <FormCard>
    <FormLayout
      onSubmit={(event) => {
        event.preventDefault();
        void formActions.submitWorkshopForm();
      }}
    >
      <WorkshopFormBasicsSection formBindings={formBindings} />

      <WorkshopFormContactSection formBindings={formBindings} />

      <WorkshopFormParticipantsSection
        formActions={{
          setExperienceLevel: formActions.setExperienceLevel,
          setNumberFieldValue: formActions.setNumberFieldValue
        }}
        formBindings={formBindings}
      />

      <WorkshopFormDescriptionSection
        formActions={{ updateDescription: formActions.updateDescription }}
        formBindings={formBindings}
      />

      <WorkshopFormLogisticsSection formBindings={formBindings} />

      <WorkshopFormPricingSection
        formActions={{
          setContractType: formActions.setContractType,
          setNumberFieldValue: formActions.setNumberFieldValue
        }}
        formBindings={formBindings}
      />

      <WorkshopFormLogoSection
        formActions={{ updateLogoFile: formActions.updateLogoFile }}
        formBindings={formBindings}
        formStatus={{ isLoadingLogo: formStatus.isLoadingLogo }}
      />

      <WorkshopFormAdditionalInfoSection formBindings={formBindings} />

      <WorkshopFormSubmissionSection
        formStatus={{
          isSubmitting: formStatus.isSubmitting,
          submitError: formStatus.submitError
        }}
      />
    </FormLayout>

    {formStatus.isComplete ? (
      <WorkshopFormSummary
        formBindings={{ formData: formBindings.formData }}
        formStatus={{ submittedAtLabel: formStatus.submittedAtLabel }}
      />
    ) : null}
  </FormCard>
);
