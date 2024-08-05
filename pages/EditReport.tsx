import AlertWithCloseButton from "@/components/skjema/information/AlertWithCloseButton";
import Information from "@/components/skjema/information/Information";
import AddRisk from "@/components/skjema/risk/AddRisk";
import Image from "next/image";
import { Box, Button, HelpText, Page, VStack } from "@navikt/ds-react";
import router from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import skjemaStyles from "@/styles/skjema/skjema.module.css";
import { getReportById } from "./api/getReportById";
import EditRisk from "@/components/dashboard/reportHistory/EditRisk";
import { submitEditedReport } from "./api/submitEditedReport";

const goHome = () => {
  router.push("/");
};

type MeasureValuesType = {
  id: string;
  riskAssessmentId: string;
  category: string;
  status: string;
};

type RiskValuesType = {
  id: string;
  reportId: string;
  probability: number;
  consequence: number;
  dependent: boolean;
  riskLevel: string;
  category: string;
  measureValues: MeasureValuesType[];
  newConsequence: number;
  newProbability: number;
};

type ReportType = {
  id: string;
  isOwner: boolean;
  ownerIdent: string;
  serviceName: string;
  riskValues: RiskValuesType[];
  reportCreated: string;
  reportEdited: string;
};

function EditReport() {
  const [riskValues, setRiskValues] = useState<RiskValuesType[]>([]);
  const [isOwner, setIsOwner] = useState(true);
  const [ownerIdent, setOwnerIdent] = useState<string>("A111111");
  const [service, setService] = useState("Ikke valgt");
  const [id, setId] = useState("Ikke valgt");
  const [submitData, setSubmitData] = useState<ReportType | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [allFieldsEdited, setAllFieldsEdited] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [reportCreated, setReportCreated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fullId, setFullId] = useState<string>("");

  const submitValues = async (value: boolean) => {
    try {
      setShowAlert(value);
      await prepareSubmit();
      setReadyToSubmit(true);
      console.log(JSON.stringify(submitData));
      if (submitData) {
        await submitEditedReport(submitData);
      }
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
  };

  const handlePostData = async () => {
    submitValues(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        try {
          setFullId(router.query.fullId as string);
          const data = await getReportById(router.query.fullId as string);
          setId(data.id);
          setService(data.serviceName);
          setIsOwner(data.isOwner);
          setOwnerIdent(data.ownerIdent);
          setRiskValues(data.riskValues);
          setSubmitData(data);
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            if (error.message === "Not Found") {
              router.push("/404");
            } else if (error.message === "Internal Server Error") {
              router.push("/500");
            } else {
              router.push("/404");
            }
          } else {
            router.push("/404");
          }
        }
      }
    };
    fetchData();
  }, []);

  const prepareSubmit = () => {
    if (submitData) {
      submitData.id = id;
      submitData.isOwner = isOwner;
      submitData.ownerIdent = isOwner ? "A111111" : ownerIdent;
      submitData.serviceName = service;
      submitData.riskValues = riskValues;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <h1>Redigeringsmodus</h1>
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
                <h3 className={skjemaStyles.h3}>Endre verdier</h3>
                <div className={skjemaStyles.helpText}>
                  <HelpText title="Hva skal du gjøre?">
                    Velg verdier for sannsynlighet og konsekvens gjort i din
                    risikovurdering
                  </HelpText>
                </div>
              </div>
              <EditRisk
                reportId={id}
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
    </>
  );
}

export default EditReport;
