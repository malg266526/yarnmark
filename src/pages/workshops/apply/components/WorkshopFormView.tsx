import React from 'react';
import { FormCard, FormLayout } from '../WorkshopFormPage.styled';
import { WorkshopFormBasicsSection } from './WorkshopFormBasicsSection';
import { WorkshopFormContactSection } from './WorkshopFormContactSection';
import { WorkshopFormDescriptionSection } from './WorkshopFormDescriptionSection';
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

      <WorkshopFormDescriptionSection
        formActions={{ updateDescription: formActions.updateDescription }}
        formBindings={formBindings}
      />

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
