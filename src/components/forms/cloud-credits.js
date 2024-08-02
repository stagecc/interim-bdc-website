import React, { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
import { Link } from "../link";
import {
  AdornedInput,
  Form,
  FormControl,
  HelpText,
  Option,
  Select,
  TextArea,
  TextInput,
} from "./inputs";

const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;
const FRESHDESK_API_ROOT_URL = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_CREATE_TICKET_URL = `${FRESHDESK_API_ROOT_URL}/tickets`;

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_API_KEY, password: "X" },
};

const SubmitButton = styled(Button).attrs({
  type: "submit",
  value: "Submit",
})``;

const ThankYouMessage = () => {
  return (
    <Paragraph center>
      Thanks &mdash; your cloud credits request has been submitted!
    </Paragraph>
  );
};

const ErrorMessage = () => {
  return (
    <Fragment>
      <Paragraph center>
        Sorry &mdash; an error occurred while submitting your request!
      </Paragraph>
      <Paragraph center>
        Please submit your request on{" "}
        <Link to="https://bdcatalyst.freshdesk.com">
          our help desk
        </Link>{" "}
        while we resolve this issue. Thanks!
      </Paragraph>
    </Fragment>
  );
};

const FormSubsection = styled.div`
  background-color: #0001;
  padding: 0.25rem 1rem 0.5rem 1rem;
  margin: 2rem 0;
  border-radius: 4px;
`

export const CloudCreditsForm = (props) => {
  const honeypotFieldRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectPi, setProjectPi] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [hlbsRelation, setHlbsRelation] = useState("");
  const [grapevine, setGrapevine] = useState("");
  const [oneRequest, setOneRequest] = useState("");
  // NHLBI BDC Pilot Funding Program
  const [preferredPlatform, setPreferredPlatform] = useState("");
  // NHLBI BDC Cloud Credit Support Program
  const [creditsProjectAbstract, setCreditsProjectAbstract] = useState("");
  const [creditsPreviouslyReceived, setCreditsPreviouslyReceived] = useState(false);
  const [creditsReceivedDescription, setCreditsReceivedDescription] = useState("");
  const [creditsEstimate, setCreditsEstimate] = useState(0);
  const [creditsRequested, setCreditsRequested] = useState(0);
  const [creditsAnticipatedTimeline, setCreditsAnticipatedTimeline] = useState("");
  const [creditsJustification, setCreditsJustification] = useState("");
  const [creditsCertify, setCreditsCertify] = useState(false);
  const [creditsResearchLinks, setCreditsResearchLinks] = useState("");
  // Cloud Credits for Academic Classes and Group Educational Sessions
  const [courseTitle, setCourseTitle] = useState("");
  const [courseInstructorsName, setCourseInstructorsName] = useState("");
  const [courseStudentCount, setCourseStudentCount] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseSupportRequested, setCourseSupportRequested] = useState(false);
  const [courseSupportDescription, setCourseSupportDescription] = useState("");

  // const [username, setUserName] = useState("");
  // const [terraUsername, setTerraUserName] = useState("");
  // const [how, setHow] = useState("");
  // const [cloudCreditsRequest, setCloudCreditsRequest] = useState("");

  const [consent, setConsent] = useState(false);

  // const [collaborators, setCollaborators] = useState("");
  // const [relatedResearch, setRelatedResearch] = useState("");
  // const [project, setProject] = useState("");
  // const [justification, setJustification] = useState("");
  // const [previousFundingDetails, setPreviousFundingDetails] = useState("");
  // const [estimate, setEstimate] = useState();
  // const [platform, setPlatform] = useState("Select One");
  // const [preferedAnalysisPlatform, setPreferedAnalysisPlatform] = useState("Not Applicable");
  // const [requestedTerraAmount, setRequestedTerraAmount] = useState(0);
  // const [requestedSevenBridgesAmount, setRequestedSevenBridgesAmount] = useState(0);

  // const [justificationLength, setJustificationLength] = useState();
  // const [previousFundingDetailsLength, setPreviousFundingDetailsLength] = useState();

  // const [projectLength, setProjectLength] = useState(0);

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();
  const [submitButtonLocked, setSubmitButtonLocked] = useState(false);

  const testSubmission = ["staging", "localhost"].includes(window.location.hostname); // ??

  const handleSubmit = (event) => {
    event.preventDefault();

    if (honeypotFieldRef.current?.value !== "") return;

    const prefix = testSubmission ? "[TEST] " : "";

    const description = ``
      + `Requestor's name: ${name} <br />`
      + `Requestor's email: ${email} <br />`
      // + `Username (Seven Bridges Only)): ${username} <br />`
      + `Project PI: ${projectPi} <br />`
      + `Requestor's role: ${role} <br />`
      + `Requestor's organization: ${organization} <br />`
      + `Team members: ${teamMembers} <br />`
      + `How is your research related to HLBS?: ${hlbsRelation} <br />`
      + `How did the requestor learn about BDC?: ${grapevine} <br />`
      + `BDC users may request one of the following: ${oneRequest} <br />`

    const cloudCreditsPayload = (oneRequest) => {
      if (oneRequest === "NHLBI BDC Pilot Funding Program") {
        return {
          preferred_analysis_platform: preferredPlatform,
        }
      }
      if (oneRequest === "NHLBI BDC Cloud Credit Support Program") {
        return {
          credits_project_abstract: creditsProjectAbstract,
          credits_previously_received: creditsPreviouslyReceived,
          credits_received_description: creditsReceivedDescription,
          credits_estimate: creditsEstimate,
          credits_requested: creditsRequested,
          credits_anticipated_timeline: creditsAnticipatedTimeline,
          credits_justification: creditsJustification,
          credits_certify: creditsCertify,
          credits_research_links: creditsResearchLinks,
        }
      }
      if (oneRequest === "Cloud Credits for Academic Classes and Group Educational Sessions") {
        return {
          course_title: courseTitle,
          course_instructors_name: courseInstructorsName,
          course_student_count: courseStudentCount,
          course_level: courseLevel,
          course_date: courseDate,
          course_support_requested: courseSupportRequested,
          course_support_description: courseSupportDescription,
        }
      }
    };

    const payload = {
      type: "Cloud Credits",
      subject: prefix + "Cloud Credits Request",
      description: prefix + description,
      priority: 1,
      status: 2,
      name: name,
      email: email,
      custom_fields: cloudCreditsPayload(oneRequest),
    };

    const submitTicket = async () => {
      setWasSubmitted(true);
      await axios
        .post(FRESHDESK_API_CREATE_TICKET_URL, payload, requestOptions)
        .then((response) => {
          if (![200, 201].includes(response.status)) {
            // setSubmitButtonLocked(false);
            throw new Error(`Unsuccessful HTTP response, ${response.status}`);
          }
          // setSubmitButtonLocked(true);
        })
        .catch((error) => {
          setError(error);
        });
    };
    submitTicket();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeProjectPi = (event) => setProjectPi(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeRole = (event) => setRole(event.target.value);
  const handleChangeOrganization = (event) => setOrganization(event.target.value);
  const handleChangeTeamMembers = (event) => setTeamMembers(event.target.value);
  const handleChangeHlbsRelation = (event) => setHlbsRelation(event.target.value);
  const handleChangeGrapevine = (event) => setGrapevine(event.target.value);
  //
  const handleChangeOneRequest = (event) => setOneRequest(event.target.value);
  // NHLBI BDC Pilot Funding Program
  const handleChangePreferredPlatform = (event) => setPreferredPlatform(event.target.value);
  // NHLBI BDC Cloud Credit Support Program
  const handleChangeCreditsProjectAbstract = (event) => setCreditsProjectAbstract(event.target.value);
  const handleChangeCreditsPreviouslyReceived = (event) => setCreditsPreviouslyReceived(event.target.checked);
  const handleChangeCreditsReceivedDescription = (event) => setCreditsReceivedDescription(event.target.value);
  const handleChangeCreditsEstimate = (event) => setCreditsEstimate(event.target.value);
  const handleChangeCreditsRequested = (event) => setCreditsRequested(event.target.value);
  const handleChangeCreditsAnticipatedTimeline = (event) => setCreditsAnticipatedTimeline(event.target.value);
  const handleChangeCreditsJustification = (event) => setCreditsJustification(event.target.value);
  const handleChangeCreditsCertify = (event) => setCreditsCertify(event.target.checked);
  const handleChangeCreditsResearchLinks = (event) => setCreditsResearchLinks(event.target.value);
  // Cloud Credits for Academic Classes and Group Educational Sessions
  const handleChangeCourseTitle = (event) => setCourseTitle(event.target.value);
  const handleChangeCourseInstructorsName = (event) => setCourseInstructorsName(event.target.value);
  const handleChangeCourseStudentCount = (event) => setCourseStudentCount(event.target.value);
  const handleChangeCourseLevel = (event) => setCourseLevel(event.target.value);
  const handleChangeCourseDate = (event) => setCourseDate(event.target.value);
  const handleChangeCourseSupportRequested = (event) => setCourseSupportRequested(event.target.checked);
  const handleChangeCourseSupportDescription = (event) => setCourseSupportDescription(event.target.value);

  const handleChangeConsent = (event) => setConsent(event.target.checked);

  return (
    <Card {...props}>
      <CardHeader>Cloud Credits Request</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          {/* fake field for detecting bots, not visible to user */}
          <FormControl fake>
            <label htmlFor="website">Website</label>
            <TextInput
              type="text"
              id="website"
              name="website"
              defaultValue=""
              tabIndex="-1"
              autoComplete="off"
              ref={honeypotFieldRef}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="name" required>Requestor's Name *</label>
            <TextInput
              type="text"
              required
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="email">Requestor's Email *</label>
            <TextInput
              type="email"
              required
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            />
            <HelpText>Please use an organizational email address.</HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="projectPi">Project PI</label>
            <TextInput
              type="text"
              id="projectPi"
              name="projectPi"
              value={projectPi}
              onChange={handleChangeProjectPi}
            />
            <HelpText>(if applicable)</HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="role">Requestor's Role *</label>
            <TextInput
              type="text"
              required
              id="role"
              name="role"
              value={role}
              onChange={handleChangeRole}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="organization">Requestor's Organization *</label>
            <TextInput
              type="text"
              required
              id="organization"
              name="organization"
              value={organization}
              onChange={handleChangeOrganization}
            />
          </FormControl>
          <FormControl>
            <label required htmlFor="team-members">Team members *</label>
            <TextArea
              id="team-members"
              required
              name="team-members"
              value={teamMembers}
              onChange={handleChangeTeamMembers}
              maxLength="3000"
              placeholder="name, title, affilition (one person per line)"
            />
            <HelpText>
              Include all the individuals using BDC to analyze data for the same project
              or the instructors for the Academic Class and Group Educational Session)*
            </HelpText>
          </FormControl>
          <FormControl>
            <label required htmlFor="hlbs-relation">How is your research related to HLBS (heart, lung, blood, and sleep)? *</label>
            <TextArea
              id="hlbs-relation"
              required
              name="hlbs-relation"
              value={hlbsRelation}
              onChange={handleChangeHlbsRelation}
              maxLength="3000"
            />
          </FormControl>
          <FormControl>
            <label required htmlFor="grapevine">How did the requestor learn about BDC? *</label>
            <TextArea
              id="grapevine"
              required
              name="grapevine"
              value={grapevine}
              onChange={handleChangeGrapevine}
              maxLength="3000"
            />
          </FormControl>
          <FormControl>
            <label required htmlFor="one-request">BDC users may request one of the following: *</label>
            <Select
              required
              id="one-request"
              name="one-request"
              value={oneRequest}
              onChange={handleChangeOneRequest}
            >
              <Option value="">Select One</Option>
              <Option value="NHLBI BDC Pilot Funding Program">NHLBI BDC Pilot Funding Program</Option>
              <Option value="NHLBI BDC Cloud Credit Support Program">NHLBI BDC Cloud Credit Support Program</Option>
              <Option value="Cloud Credits for Academic Classes and Group Educational Sessions">Cloud Credits for Academic Classes and Group Educational Sessions</Option>
            </Select>
          </FormControl>

          {
            oneRequest === "NHLBI BDC Pilot Funding Program" && (
              <FormSubsection>
                <FormControl>
                  <label required htmlFor="preferred-analysis-platform">Preferred analysis platform:</label>
                  <Select
                    required
                    id="preferred-analysis-platform"
                    name="preferred-analysis-platform"
                    value={preferredPlatform}
                    onChange={handleChangePreferredPlatform}
                  >
                    <Option value="">Select One</Option>
                    <Option value="BDC Seven Bridges">BDC Seven Bridges</Option>
                    <Option value="BDC-Terra">BDC-Terra</Option>
                    <Option value="Both BDC Seven Bridges and BDC-Terra">Both BDC Seven Bridges and BDC-Terra</Option>
                  </Select>
                </FormControl>
              </FormSubsection>
            )
          }
          {
            oneRequest === "NHLBI BDC Cloud Credit Support Program" && (
              <FormSubsection>
                <FormControl>
                  <label required htmlFor="credits-project-abstract">Project abstract with a description of the project’s scientific significance and aims</label>
                  <TextArea
                    id="credits-project-abstract"
                    required
                    name="credits-project-abstract"
                    value={creditsProjectAbstract}
                    onChange={handleChangeCreditsProjectAbstract}
                    maxLength="3000"
                  />
                </FormControl>
                
                {/* Project abstract with a description of the project’s scientific significance and aims [long answer] */}
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '80px', padding: '1rem 2rem' }}>
                    <TextInput
                      type="checkbox"
                      checked={ creditsPreviouslyReceived }
                      name="credits-previously-received"
                      onChange={ handleChangeCreditsPreviouslyReceived }
                    />
                  </div>
                  {/* Previous receipt of cloud credits from BDC (including Pilot Funding and other Cloud Credit Support Program approvals) [yes/no] */}
                  <div style={{ flex: 1 }}>
                    <label htmlFor="credits-previously-received">
                      <Paragraph>
                        Previous receipt of cloud credits from BDC (including Pilot
                        Funding and other Cloud Credit Support Program approvals)
                      </Paragraph>
                    </label>
                    {/* If yes, briefly outline your use of previous cloud credit funding */}
                    {creditsPreviouslyReceived && (
                      <FormControl>
                        <label required htmlFor="credits-received-description">If yes, briefly outline your use of previous cloud credit funding</label>
                        <TextArea
                          id="credits-received-description"
                          required
                          name="credits-received-description"
                          value={creditsReceivedDescription}
                          onChange={handleChangeCreditsReceivedDescription}
                          maxLength="3000"
                        />
                      </FormControl>
                    )}
                    {/* If no, apply for pilot funding first [no response required] */}
                  </div>
                </div>
                {/* Computational Scope (i.e., computational tasks)  */}
                <div>Computational Scope</div>
                {/* Estimated amount of cloud credits needed [dollar amount] */}
                <FormControl>
                  <label htmlFor="redits-estimate">Estimated amount of cloud credits needed</label>
                  <AdornedInput
                    type="number"
                    required
                    min="0"
                    id="credits-estimate"
                    name="credits-estimate"
                    value={creditsEstimate}
                    onChange={handleChangeCreditsEstimate}
                    adornment="$"
                  />
                </FormControl>
                {/* Amount of cloud credits being requested [dollar amount] */}
                <FormControl>
                  <label htmlFor="credits-requested">Amount of cloud credits being requested</label>
                  <AdornedInput
                    type="number"
                    required
                    min="0"
                    id="credits-requested"
                    name="credits-requested"
                    value={creditsRequested}
                    onChange={handleChangeCreditsRequested}
                    adornment="$"
                  />
                </FormControl>
                {/* Anticipated timeline for the work [short answer] */}
                <FormControl>
                  <label htmlFor="credits-antipated-timeline">Anticipated timeline for the work</label>
                  <TextInput
                    type="text"
                    required
                    id="credits-antipated-timeline"
                    name="credits-antipated-timeline"
                    value={creditsAnticipatedTimeline}
                    onChange={handleChangeCreditsAnticipatedTimeline}
                  />
                </FormControl>
                {/* Describe your compelling need for these funds to conduct this research using BDC [long answer] */}
                <FormControl>
                  <label required htmlFor="credits-justification">Describe your compelling need for these funds to conduct this research using BDC</label>
                  <TextArea
                    id="credits-justification"
                    required
                    name="credits-justification"
                    value={creditsJustification}
                    onChange={handleChangeCreditsJustification}
                    maxLength="3000"
                  />
                </FormControl>
                {/* I certify that the federal or private funding secured for this project is insufficient to support the computational cloud costs I am requesting [checkbox] */}
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '80px', padding: '1rem 2rem' }}>
                    <TextInput
                      type="checkbox"
                      checked={ creditsCertify }
                      name="credits-certify"
                      onChange={ handleChangeCreditsCertify }
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="credits-certify">
                      <Paragraph>
                        I certify that the federal or private funding secured for this project is
                        insufficient to support the computational cloud costs I am requesting
                      </Paragraph>
                    </label>
                  </div>
                </div>
                {/* If available, include a link to a list of your publications/research results [short answer] */}
                <FormControl>
                  <label htmlFor="credits-research-links">If available, include a link to a list of your publications/research results</label>
                  <TextInput type="number" id="credits-research-links" name="credits-research-links" value={creditsResearchLinks} onChange={handleChangeCreditsResearchLinks} />
                </FormControl>
              </FormSubsection>
            )
          }
          {
            oneRequest === "Cloud Credits for Academic Classes and Group Educational Sessions" && (
              <FormSubsection>
                <FormControl>
                  <label htmlFor="course-title">Course Title</label>
                  <TextInput id="course-title" name="course-title" value={courseTitle} onChange={handleChangeCourseTitle} />
                </FormControl>
                <FormControl>
                  <label htmlFor="course-instructor-name">Course instructor's name</label>
                  <TextInput id="course-instructor-name" name="course-instructor-name" value={courseInstructorsName} onChange={handleChangeCourseInstructorsName} />
                </FormControl>
                <FormControl>
                  <label htmlFor="course-student-count">Anticipated number of participants/students</label>
                  <TextInput type="number" id="course-student-count" name="course-student-count" value={courseStudentCount} onChange={handleChangeCourseStudentCount} />
                </FormControl>
                <FormControl>
                  <label htmlFor="course-level">Course level</label>
                  <TextInput id="course-level" name="course-level" value={courseLevel} onChange={handleChangeCourseLevel} />
                </FormControl>
                <FormControl>
                  <label htmlFor="course-date">Anticipated course/presentation date</label>
                  <TextInput type="date" id="course-date" name="course-date" value={courseDate} onChange={handleChangeCourseDate} />
                </FormControl>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '80px', padding: '1rem 2rem' }}>
                    <TextInput
                      type="checkbox"
                      checked={ courseSupportRequested }
                      name="course-support-requested"
                      onChange={ handleChangeCourseSupportRequested }
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="course-support-requested">
                      <Paragraph>
                        Do you wish to have support during the course/presentation from a BDC representative?
                      </Paragraph>
                    </label>
                  </div>
                </div>
                {courseSupportRequested && (
                  <FormControl>
                    <label htmlFor="course-support-description">Description of how BDC can support your course</label>
                    <TextArea
                      id="course-support-description"
                      name="course-support-description"
                      value={courseSupportDescription}
                      onChange={handleChangeCourseSupportDescription}
                      maxLength="3000"
                    />
                  </FormControl>
                )}
              </FormSubsection>
            )
          }

          <FormControl>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '80px', padding: '1rem 2rem' }}>
                <TextInput
                  type="checkbox"
                  checked={ consent }
                  name="consent"
                  onChange={ handleChangeConsent }
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="consent">
                  <Paragraph>
                    By submitting the following form, you agree to the requirements noted above, the BDC Terms of Use and Policies, and to receive emails from BDC. You can opt out of receiving emails at any time. 
                  </Paragraph>
                  <Paragraph>
                    Those approved for NHLBI BDC Cloud Credit Support Program cloud credits also agree to request and receive one-on-one assistance from BDC to manage usage costs. 
                  </Paragraph>
                </label>
              </div>
            </div>
          </FormControl>

          <br />

          <SubmitButton disabled={submitButtonLocked || !consent}>Submit</SubmitButton>
        </Form>

        {wasSubmitted && !error && <ThankYouMessage />}

        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};
