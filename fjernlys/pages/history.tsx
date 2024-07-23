import { getReportByService } from "@/pages/api/getReportByService";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllInfoByService } from "./api/getAllInfoByService";
import { Box, Button, Page, Table, VStack } from "@navikt/ds-react";
import GenerateRiskTableFromValues from "@/components/dashboard/showReports/GenerateRiskTableFromValues";
import { LineGraphDotIcon } from "@navikt/aksel-icons";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Image from "next/image";

type MeasureValuesType = {
  id: string;
  risk_assessment_id: string;
  category: string;
  status: string;
};

type RiskValuesType = {
  id: string;
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

const goHome = () => {
  router.push("/");
};

function ViewReportHistory() {
  const [fullId, setFullId] = useState<string | null>(null);

  const [reports, setReports] = useState<ReportType[]>([]);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setFullId(router.query.fullId as string);
      handleGetReports();
    }
  }, [router.isReady, router.query]);

  const handleGetReports = async () => {
    setReports(await getAllInfoByService("Dagpenger"));
  };

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("nb", options).format(new Date(dateString));
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
        <div className={riskStyles.skjemaDiv}>
          <VStack gap="4" align={"start"} className={riskStyles.vstack}>
            <h1>Versjonshistorikk for rapport</h1>
            <p>
              Her ser du en sortert oversikt over alle ulike versjoner av denne
              risikovurderingen, fra nyeste til eldste versjon.{" "}
            </p>
            <Table style={{ margin: "32px" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell scope="col">
                    Tjeneste/Ytelse
                  </Table.HeaderCell>
                  <Table.HeaderCell scope="col">Eier</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Antall Risiko</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Endret</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {reports.map((element) => (
                  <Table.ExpandableRow
                    key={element.id}
                    content={
                      <GenerateRiskTableFromValues risks={element.riskValues} />
                    }
                  >
                    <Table.DataCell scope="row">
                      {element.serviceName}
                    </Table.DataCell>
                    <Table.DataCell>{element.ownerIdent}</Table.DataCell>
                    <Table.DataCell>{element.riskValues.length}</Table.DataCell>
                    <Table.DataCell>
                      {formatDate(element.reportCreated)}
                    </Table.DataCell>
                    <Table.DataCell>
                      {formatDate(element.reportEdited)}
                    </Table.DataCell>
                  </Table.ExpandableRow>
                ))}
              </Table.Body>
            </Table>
          </VStack>
        </div>
      </Page>
    </>
  );
}

export default ViewReportHistory;
