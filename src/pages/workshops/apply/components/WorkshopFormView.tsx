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
import { WorkshopFormSuccessModal } from './WorkshopFormSuccessModal';
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
          draftStatus: formStatus.draftStatus,
          isLoadingLogo: formStatus.isLoadingLogo,
          isSubmitting: formStatus.isSubmitting,
          submitError: formStatus.submitError
        }}
      />
    </FormLayout>

    <WorkshopFormSuccessModal
      isOpen={formStatus.isSuccessModalOpen}
      formBindings={{ formData: formStatus.submittedFormData ?? formBindings.formData }}
      formStatus={{ submittedAtLabel: formStatus.submittedAtLabel }}
      onConfirm={formActions.closeSuccessModal}
    />
  </FormCard>
);
