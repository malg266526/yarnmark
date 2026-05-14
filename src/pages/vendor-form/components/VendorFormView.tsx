import React from 'react';
import { FormCard, FormLayout } from '../VendorFormPage.styled';
import { VendorFormBasicsSection } from './VendorFormBasicsSection';
import { VendorFormBusinessDescriptionSection } from './VendorFormBusinessDescriptionSection';
import { VendorFormContactSection } from './VendorFormContactSection';
import { VendorFormInvoiceSection } from './VendorFormInvoiceSection';
import { VendorFormStandPreferencesSection } from './VendorFormStandPreferencesSection';
import { VendorFormStatuteSection } from './VendorFormStatuteSection';
import { VendorFormSubmissionSection } from './VendorFormSubmissionSection';
import { VendorFormSummary } from './VendorFormSummary';
import type { VendorFormViewProps } from './vendorFormViewContracts';

export const VendorFormView = ({ derivedState, formActions, formBindings, formStatus }: VendorFormViewProps) => (
  <FormCard>
    <FormLayout
      onSubmit={(event) => {
        event.preventDefault();
        void formActions.submitVendorForm();
      }}
    >
      <VendorFormBasicsSection
        formActions={{
          setBooleanFieldValue: formActions.setBooleanFieldValue,
          setMainCategory: formActions.setMainCategory
        }}
        formBindings={formBindings}
      />

      <VendorFormStandPreferencesSection
        derivedState={derivedState}
        formActions={{
          setBooleanFieldValue: formActions.setBooleanFieldValue,
          togglePreferredStand: formActions.togglePreferredStand
        }}
        formBindings={formBindings}
      />

      <VendorFormContactSection formBindings={formBindings} />

      <VendorFormInvoiceSection
        formActions={{ updateLogoFile: formActions.updateLogoFile }}
        formBindings={formBindings}
        formStatus={{ isLoadingLogo: formStatus.isLoadingLogo }}
      />

      <VendorFormBusinessDescriptionSection
        formActions={{ updateBusinessDescription: formActions.updateBusinessDescription }}
        formBindings={formBindings}
      />

      <VendorFormStatuteSection
        formActions={{ setAcceptedStatuteValue: formActions.setAcceptedStatuteValue }}
        formBindings={formBindings}
      />

      <VendorFormSubmissionSection
        formStatus={{
          isSubmitting: formStatus.isSubmitting,
          submitError: formStatus.submitError
        }}
      />
    </FormLayout>

    {formStatus.isComplete ? (
      <VendorFormSummary
        formBindings={{ formData: formBindings.formData }}
        formStatus={{ submittedAtLabel: formStatus.submittedAtLabel }}
      />
    ) : null}
  </FormCard>
);
