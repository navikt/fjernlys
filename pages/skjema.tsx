import { Box, Button, HelpText, Page, VStack } from "@navikt/ds-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Information from "@/components/skjema/information/Information";
import AddRisk from "@/components/skjema/risk/AddRisk";
import router from "next/router";
import AlertWithCloseButton from "@/components/skjema/information/AlertWithCloseButton";
import skjemaStyles from "@/styles/skjema/skjema.module.css";
import { postReport } from "./api/postReport";
import PopUp from "@/components/PopUp";

const goHome = () => {
  router.push("/");
};

const goToDashboard = () => {
  router.push("/dashboard");
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
  const [isOwner, setIsOwner] = useState(true);
  const [ownerIdent, setOwnerIdent] = useState<string>("A111111");
  const [service, setService] = useState("Ikke valgt");
  const [submitData, setSubmitData] = useState<submitDataType>({
    ownerData: isOwner,
    notOwnerData: ownerIdent,
    serviceData: service,
    riskValues: riskValues,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [allFieldsEdited, setAllFieldsEdited] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const prepareSubmit = useCallback(() => {
    const data = {
      ownerData: isOwner,
      notOwnerData: ownerIdent,
      serviceData: service,
      riskValues: riskValues,
    };
    setSubmitData({ ...data });
  }, [isOwner, ownerIdent, service, riskValues]);

  const test = useCallback(
    (value: boolean) => {
      setShowAlert(value);
      prepareSubmit();
      setReadyToSubmit(true);
    },
    [prepareSubmit]
  );

  const test2 = useCallback((value: boolean) => {
    setShowErrorAlert(value);
  }, []);

  const handlePostData = useCallback(async () => {
    if (!allFieldsEdited) {
      test2(true);
      return;
    }
    test(true);

    try {
      const data = await submitData;
      const result = await postReport(data);
      setShowPopup(true);
    } catch (error: any) {
      if (error instanceof Error) {
        //console.log("Error: ", error.message);
        if (error.message === "Not Found") {
          router.push("/404");
        } else if (error.message === "Internal Server Error") {
          router.push("/500");
        } else {
          // Handle other errors or show a generic error message
          router.push("/404");
        }
      } else {
        router.push("/404");
      }
    }
  }, [allFieldsEdited, submitData, test, test2]);

  useEffect(() => {
    if (!readyToSubmit) {
      return;
    }
    if (readyToSubmit) {
      handlePostData();
      setReadyToSubmit(false);
    }
  }, [readyToSubmit, handlePostData]);

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
          >
            Skjemaet er sendt inn
          </AlertWithCloseButton>
        </div>
        <div className={skjemaStyles.alertComponent}>
          <AlertWithCloseButton
            variant="warning"
            showPropAlert={showErrorAlert}
            setShowAlert={setShowErrorAlert}
          >
            Du må fylle inn alle feltene før du kan sende inn
          </AlertWithCloseButton>
        </div>
        <div className={riskStyles.skjemaDiv}>
          <VStack gap="4" align={"start"} className={riskStyles.vstack}>
            <h1>Rapporteringsskjema</h1>
            <Information
              service={service}
              setService={setService}
              isOwner={isOwner}
              setIsOwner={setIsOwner}
              ownerIdent={ownerIdent}
              setOwnerIdent={setOwnerIdent}
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
                  handlePostData();
                }}
              >
                <div>Send inn</div>
              </Button>
            </div>
          </VStack>
        </div>
      </Page>
      {showPopup && (
        <PopUp
          goHome={goHome}
          goToDashboard={goToDashboard}
          popUpText={"Skjemaet er sendt inn!"}
        />
      )}
    </>
  );
};

export default FillForm;
