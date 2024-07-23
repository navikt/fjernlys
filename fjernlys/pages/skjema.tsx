import { Box, Button, HelpText, Page, VStack } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Information from "@/components/skjema/information/Information";
import AddRisk from "@/components/skjema/risk/AddRisk";
import router from "next/router";
import AlertWithCloseButton from "@/components/skjema/information/AlertWithCloseButton";
import skjemaStyles from "@/styles/skjema/skjema.module.css";
import { postReport } from "./api/postReport";

const goHome = () => {
  router.push("/");
};
type measureValuesType = { category: string; status: string };

type riskValuesType = {
  probability: number;
  consequence: number;
  dependent: boolean;
  riskLevel: string;
  category: string;
  measureValues?: measureValuesType[];
  newConsequence?: string;
  newProbability?: string;
};

type submitDataType = {
  ownerData: boolean;
  notOwnerData?: string | null;
  serviceData: string;
  riskValues: riskValuesType[];
};

const FillForm = () => {
  const [riskValues, setRiskValues] = useState<riskValuesType[]>([
    {
      probability: 0,
      consequence: 0,
      dependent: false,
      riskLevel: "Ingen vurdering",
      category: "Ikke satt",
    },
  ]);
  const [owner, setOwner] = useState(true);
  const [notOwner, setNotOwner] = useState<string>("A111111");
  const [service, setService] = useState("Ikke valgt");
  const [submitData, setSubmitData] = useState<submitDataType>({
    ownerData: owner,
    notOwnerData: notOwner,
    serviceData: service,
    riskValues: riskValues,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [allFieldsEdited, setAllFieldsEdited] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const prepareSubmit = () => {
    const data: submitDataType = {
      ownerData: owner,
      notOwnerData: notOwner,
      serviceData: service,
      riskValues: riskValues,
    };
    setSubmitData(data);
  };

  const test = (value: boolean) => {
    setShowAlert(value);
    prepareSubmit();
    setReadyToSubmit(true);
  };

  const handlePostData = async () => {
    if (!allFieldsEdited) {
      alert("Please edit all fields before submitting");
      return;
    }
    test(true);
    try {
      const data = await submitData;
      const result = await postReport(data);
      console.log("Response from postData:", result);
    } catch (error) {
      console.error("Error from postData:", error);
    }
  };

  useEffect(() => {
    if (!readyToSubmit) {
      return;
    }
    if (readyToSubmit) {
      handlePostData();
      setReadyToSubmit(false);
      alert("Form submitted");
      goHome();
    }
  }, [readyToSubmit]);

  useEffect(() => {
    console.log(JSON.stringify(submitData));
  }, [submitData]);

  return (
    <>
      <Page
        background="bg-subtle"
        footer={
          <Box as="footer" background="surface-neutral-moderate" padding="8">
            <Page.Block gutters>Fjernlys sommer 2024 ☀️</Page.Block>
          </Box>
        }
        className={landingPageStyles.page}
      >
        <Box as="header" background="surface-neutral-moderate" padding="8">
          <Page.Block gutters>
            <div style={{ cursor: "pointer" }}>
              {" "}
              <Image
                src="/Rød.png"
                width={85}
                height={55}
                alt={"Nav Logo"}
                onClick={goHome}
              />
            </div>
            RAPPORTERINGSSYSTEM
          </Page.Block>
        </Box>
        <div className={skjemaStyles.alertComponent}>
          <AlertWithCloseButton
            variant="success"
            showPropAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </div>
        <div className={riskStyles.skjemaDiv}>
          <VStack gap="4" align={"start"} className={riskStyles.vstack}>
            <h1>Rapporteringsskjema</h1>
            <Information
              service={service}
              setService={setService}
              owner={owner}
              setOwner={setOwner}
              setNotOwner={setNotOwner}
            />
            <div className={skjemaStyles.contentDiv}>
              <h2>Risiko</h2>
              <div className={skjemaStyles.valuesHeaderDiv}>
                <h3 className={skjemaStyles.h3}>Fyll inn verdier</h3>
                <div className={skjemaStyles.helpText}>
                  <HelpText title="Hva skal du gjøre?">
                    Velg verdier for sannsynlighet og konsekvens gjort i din
                    risikovurdering
                  </HelpText>
                </div>
              </div>

              <AddRisk
                riskValues={riskValues}
                setriskValues={setRiskValues}
                onFieldsEdited={setAllFieldsEdited}
              />
            </div>
            <div className={skjemaStyles.buttonDiv}>
              <Button
                variant="primary"
                onClick={() => {
                  test(true);
                }}
              >
                <div>Send inn</div>
              </Button>
            </div>
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default FillForm;
