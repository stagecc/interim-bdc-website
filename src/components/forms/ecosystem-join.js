import React, { Fragment, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
import { navigate } from "gatsby";
import {
  Checkbox,
  Form,
  FormControl,
  HelpText,
  Option,
  Select,
  TextArea,
  TextInput,
} from "./inputs";

const FRESHDESK_USER_NAME = process.env.GATSBY_FRESHDESK_API_KEY;
const FRESHDESK_PASSWORD = process.env.GATSBY_FRESHDESK_PASSWORD;
const FRESHDESK_API_ROOT_URL = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_CREATE_CONTACT = `${FRESHDESK_API_ROOT_URL}/contacts`;

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_USER_NAME, password: FRESHDESK_PASSWORD },
};

const SubmitButton = styled(Button).attrs({
  type: "submit",
  value: "Submit",
})``;

const ErrorMessage = () => {
  return (
    <Fragment>
      <Paragraph center>
        The email address provided is already associated with a BDC
        account. For questions, please email{" "}
        <a href="mailto: biodatacatalyst@nhlbi.nih.gov">
          biodatacatalyst@nhlbi.nih.gov
        </a>
      </Paragraph>
    </Fragment>
  );
};

export const EcosystemForm = (props) => {
  const formRef = useRef(null)
  const honeypotFieldRef = useRef(null);

  const [name, setName] = useState("");
  const [eraCommonsId, setEraCommonsId] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [otherFieldOfStudySelected, setOtherFieldOfStudySelected] = useState(false);
  const [otherFieldOfStudy, setOtherFieldOfStudy] = useState("");
  
  const [interest, setInterest] = useState("");
  const otherInterestSelected = useMemo(() => interest === "Other", [interest]);
  const [otherInterest, setOtherInterest] = useState("");
  
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (honeypotFieldRef.current?.value !== "") return;

    const payload = {
      name: name,
      email: email,
      custom_fields: {
        era_commons_id: eraCommonsId,
        contacts_organization: organization,
        contacts_field: fieldOfStudy.toString(),
        contacts_other: otherFieldOfStudy,
        contacts_interest: interest,
      },
    };

    const submitContact = async () => {
      setWasSubmitted(true);
      await axios
        .post(FRESHDESK_API_CREATE_CONTACT, payload, requestOptions)
        .then((response) => {
          if (![200, 201].includes(response.status)) {
            throw new Error(`Unsuccessful HTTP response, ${response.status}`);
          } else {
            navigate("/contact/ecosuccess");
          }
        })
        .catch((error) => {
          setError(error);
        });
    };

    submitContact();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeCommons = (event) => setEraCommonsId(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeOrganization = (event) => setOrganization(event.target.value);
  const handleChangeFieldOfStudy = (event) => {
    let newFieldOfStudy = [...fieldOfStudy];
    const index = newFieldOfStudy.indexOf(event.target.value);
    if (index === -1) {
      newFieldOfStudy = ([...newFieldOfStudy, event.target.value]);
    } else {
      newFieldOfStudy = ([...newFieldOfStudy.slice(0, index), ...newFieldOfStudy.slice(index + 1)]);
    }
    setOtherFieldOfStudySelected(newFieldOfStudy.includes("Other"));
    setFieldOfStudy(newFieldOfStudy);
  };

  const handleChangeOtherField = (event) => setOtherFieldOfStudy(event.target.value);
  const handleChangeInterest = (event) => setInterest(event.target.value);
  const handleChangeOtherInterest = (event) => setOtherInterest(event.target.value);

  return (
    <Card {...props}>
      <CardHeader>Join the Ecosystem </CardHeader>
      <CardBody>
        <Paragraph>
          Information on this form is considered Personally Identifiable Information (PII).
          If you wish to protect your privacy, send this information securely through external
          means such as US mail. Information may be examined, recorded, copied, and used for
          authorized purposes during monitoring. All information placed on or sent over this
          system may be monitored.
        </Paragraph>
        <Paragraph right noMargin>
          <em>Fields with an asterisk (*) are required.</em>
        </Paragraph>
        {!wasSubmitted && (
          <Form onSubmit={handleSubmit} ref={ formRef }>
            {/* fake field for detecting bots, not visible to user */}
            <FormControl fake>
              <label htmlFor="website">
                Website
              </label>
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
              <label htmlFor="name" required>
                Your Full Name *
              </label>
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
              <label required htmlFor="commons">eRA Commons ID</label>
              <TextInput
                type="commons"
                id="commons"
                name="commons"
                value={eraCommonsId}
                onChange={handleChangeCommons}
              />
              <HelpText>
                eRA Commons ID is a common way to authenticate through the ecosystem.
                Please include your eRA Commons ID if you already have an account.
                You can still join the community if you do not yet have an eRA Commons account.
              </HelpText>
            </FormControl>
            <FormControl>
              <label htmlFor="email">Email Address *</label>
              <TextInput
                type="email"
                required
                id="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
              />
              <HelpText>
                Please use an organization email address.
                Your email address will serve as your user account name.
              </HelpText>
            </FormControl>
            <FormControl>
              <label htmlFor="organization">Organization *</label>
              <TextInput
                type="organization"
                required
                id="organization"
                name="organization"
                value={organization}
                onChange={handleChangeOrganization}
              />
            </FormControl>
            <FormControl onChange={handleChangeFieldOfStudy}>
              <label htmlFor="field">Field of Study or Research Area *</label>
              <HelpText>Select all that apply</HelpText>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gridGap: '1rem',
              }}>
                <Checkbox value="Heart" name="field" label="Heart" />
                <Checkbox value="Lung" name="field" label="Lung" />
                <Checkbox value="Blood" name="field" label="Blood" />
                <Checkbox value="Sleep" name="field" label="Sleep" />
                <Checkbox value="Methods" name="field" label="Methods" />
                <Checkbox value="Sickle Cell Disease" name="field" label="Sickle Cell Disease" />
                <Checkbox value="Implementation Science" name="field" label="Implementation Science" />
                <Checkbox value="Precision Medicine" name="field" label="Precision Medicine" />
                <Checkbox value="Clinical Trials Optimization" name="field" label="Clinical Trials Optimization" />
                <Checkbox value="Small Business" name="field" label="Small Business" />
                <Checkbox value="HIV/AIDS" name="field" label="HIV/AIDS" />
                <Checkbox value="COVID-19" name="field" label="COVID-19" />
                <Checkbox value="Other" name="field" label="Other" />
              </div>
            </FormControl>
            {otherFieldOfStudySelected && (
              <FormControl>
                <label required htmlFor="other">
                  If Other, please provide a brief description. *
                </label>
                <TextArea
                  id="other"
                  required
                  name="other"
                  value={otherFieldOfStudy}
                  onChange={handleChangeOtherField}
                  maxLength="3000"
                />
              </FormControl>
            )}
            <FormControl>
              <label required htmlFor="interest">
                Why are you joining BDC?
              </label>
              <Select
                required
                id="interest"
                name="interest"
                value={interest}
                onChange={handleChangeInterest}
              >
                <Option value="">Select One</Option>
                <Option value="I want to conduct research using BDC">
                  I want to conduct research using BDC
                </Option>
                <Option value="I want to use BDC as a data repository">
                  I want to use BDC as a data repository
                </Option>
                <Option value="I want to use the BDC TOPMed Imputation Server">
                  I want to use the BDC TOPMed Imputation Server
                </Option>
                <Option value="I’m not a researcher, but I want to keep up with the latest news about BDC">
                  I’m not a researcher, but I want to keep up with the latest news about BDC
                </Option>
                <Option value="Other">
                  Other
                </Option>
              </Select>
            </FormControl>
            {otherInterestSelected && (
              <FormControl>
                <label required htmlFor="other">
                  If Other, please provide a brief description. *
                </label>
                <TextArea
                  id="other-interest"
                  required
                  name="other-interest"
                  value={otherInterest}
                  onChange={handleChangeOtherInterest}
                  maxLength="3000"
                />
              </FormControl>
            )}

            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};

