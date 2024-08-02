import { Button, Select, Table } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/information.module.css";
import { getAllInfoByService } from "@/pages/api/getAllInfoByService";
import GenerateRiskTableFromValues from "./GenerateRiskTableFromValues";
import { LineGraphDotIcon } from "@navikt/aksel-icons";
import Link from "next/link";
import router from "next/router";
import { getReportCopyToHistoryTable } from "@/pages/api/getReportToHistoryTable";
import { getRiskLevels } from "@/pages/api/getRiskLevels";

type MeasureValuesType = {
  id: string;
  risk_assessment_id: string;
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

const goToHistory = (id: string) => {
  const fullId = id;
  const shortId = fullId.substring(0, 8);
  router.push(
    {
      pathname: "/history",
      query: { fullId: fullId },
    },
    `/history/${shortId}`
  );
};

const ShowReports = () => {
  const [service, setService] = useState("Ikke valgt");
  const [serviceElements, setServiceElements] = useState<ReportType[]>([]);
  const [reportCopy, setReportCopy] = useState<ReportType | null>(null);

  const handleChange = async (service: string) => {
    setService(service);
    try {
      setServiceElements(await getAllInfoByService(service));
    } catch (error: any) {
      if (error instanceof Error) {
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
      {" "}
      <div className={styles.selectDiv}>
        <div className={styles.dropdownDiv}>
          <Select
            label={"Ytelse/tjeneste"}
            onChange={(e) => handleChange(e.target.value)}
            value={service}
          >
            <option value="Ikke valgt" disabled>
              Velg ytelse/tjeneste
            </option>
            <option value="Alderspensjon">Alderspensjon</option>
            <option value="Uføretrygd">Uføretrygd</option>
            <option value="AAP">AAP</option>
            <option value="Sykepenger">Sykepenger</option>
            <option value="Dagpenger">Dagpenger</option>
            <option value="Foreldrepenger">Foreldrepenger</option>
            <option value="Utbetaling">Utbetaling</option>
          </Select>
        </div>
      </div>
      <Table style={{ margin: "32px" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Tjeneste/Ytelse</Table.HeaderCell>
            <Table.HeaderCell scope="col">Eier</Table.HeaderCell>
            <Table.HeaderCell scope="col">Antall Risiko</Table.HeaderCell>
            <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
            <Table.HeaderCell scope="col">Endret</Table.HeaderCell>
            <Table.HeaderCell scope="col">Historikk</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serviceElements.map((element) => (
            <Table.ExpandableRow
              key={element.id}
              content={
                <GenerateRiskTableFromValues risks={element.riskValues} />
              }
            >
              <Table.DataCell scope="row">{element.serviceName}</Table.DataCell>
              <Table.DataCell>{element.ownerIdent}</Table.DataCell>
              <Table.DataCell>{element.riskValues.length}</Table.DataCell>
              <Table.DataCell>
                {formatDate(element.reportCreated)}
              </Table.DataCell>
              <Table.DataCell>
                {formatDate(element.reportEdited)}
              </Table.DataCell>
              <Table.DataCell scope="row">
                <Button
                  variant="secondary"
                  className={styles.trashcan}
                  icon={
                    <LineGraphDotIcon title="a11y-title" fontSize="1.5rem" />
                  }
                  size="small"
                  onClick={() => {
                    goToHistory(element.id);
                  }}
                >
                  Se historikk
                </Button>
              </Table.DataCell>
            </Table.ExpandableRow>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default ShowReports;
