import React, { useMemo } from 'react';
import {
  ApplicationCard,
  ApplicationHeader,
  ApplicationsMeta,
  ApplicationsMetaRow,
  ApplicationsStack,
  ApplicationTitle,
  ProposalNotice,
  ProposalNoticeTitle,
  ProposalSection,
  ProposalSectionTitle
} from '../VendorsApplicationsPage.styled';
import { countCertainStandsByApplication, getCertainStandProposals } from '../utils/certainStandUtils';
import { VendorsApplicationsCertainStandsViewProps } from './vendorsApplicationsViewContracts';

const MIN_SHARED_CANDIDATE_STANDS = 2;

export const VendorsApplicationsCertainStandsView = ({
  applications,
  description,
  emptyLabel,
  resolveChoiceLabel,
  resolveCountLabel,
  resolveMultipleStandsLabel,
  title,
  vendorLabel
}: VendorsApplicationsCertainStandsViewProps) => {
  const proposals = useMemo(() => getCertainStandProposals(applications), [applications]);
  const certainStandCounts = useMemo(() => countCertainStandsByApplication(proposals), [proposals]);

  return (
    <>
      <ProposalNotice>
        <ProposalNoticeTitle>{title}</ProposalNoticeTitle>
        <ApplicationsMeta>{description}</ApplicationsMeta>
        <ApplicationsMeta>{resolveCountLabel(proposals.length)}</ApplicationsMeta>
      </ProposalNotice>

      {proposals.length === 0 ? (
        <ProposalSection>
          <ProposalSectionTitle>{emptyLabel}</ProposalSectionTitle>
        </ProposalSection>
      ) : (
        <ProposalSection>
          <ApplicationsStack>
            {proposals.map((proposal) => {
              const sharedCandidateStands = certainStandCounts.get(proposal.applicationId) ?? 1;

              return (
                <ApplicationCard key={proposal.standId}>
                  <ApplicationHeader>
                    <ApplicationTitle>{proposal.standId}</ApplicationTitle>
                    <ApplicationsMetaRow>
                      <ApplicationsMeta>
                        {vendorLabel}: {proposal.storeName}
                      </ApplicationsMeta>
                      <ApplicationsMeta>{resolveChoiceLabel(proposal.choicePosition)}</ApplicationsMeta>
                      {sharedCandidateStands >= MIN_SHARED_CANDIDATE_STANDS ? (
                        <ApplicationsMeta>{resolveMultipleStandsLabel(sharedCandidateStands)}</ApplicationsMeta>
                      ) : null}
                    </ApplicationsMetaRow>
                  </ApplicationHeader>
                </ApplicationCard>
              );
            })}
          </ApplicationsStack>
        </ProposalSection>
      )}
    </>
  );
};
