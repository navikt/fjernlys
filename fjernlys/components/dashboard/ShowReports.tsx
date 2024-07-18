import { Select, Table } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/information.module.css";
import { getReportByService } from "@/pages/api/getReportByService";
import { getAllInforByService } from "@/pages/api/getAllInfoByService";
import DashboardOverview from "@/pages/dashboardOverview";
import GenerateRiskTableFromValues from "./GenerateRiskTableFromValues";

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
  is_owner: boolean;
  owner_ident: string;
  service_name: string;
  risk_values: RiskValuesType[];
  report_created: string;
  report_edited: string;
};

function ShowReports() {
  const [service, setService] = useState("Ikke valgt");
  const [serviceElements, setServiceElements] = useState<ReportType[]>([]);

  const handleChange = async (service: string) => {
    setService(service);
    setServiceElements(await getAllInforByService(service));
  };

  useEffect(() => {
    console.log(serviceElements);
  }, [serviceElements]);

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

  const generate = (riskTypes: RiskValuesType[]) => {
    const [riskList, setriskList] = useState<
      {
        element: JSX.Element;
      }[]
    >([]);
    setriskList(
      riskTypes.map((item, index) => ({
        element: (
          <DashboardRiskComponent
            riskIDNum={index}
            probability={item.probability}
            consequence={item.consequence}
            existingDependent={item.dependent}
            existingRiskLevel={item.riskLevel}
            existingCategory={item.category}
            existingMeasureValues={item.measureValues}
            newConsequence={item.newConsequence}
            newProbability={item.newProbability}
          />
        ),
      }))
    );

    return <>{riskList}</>;
  };

  const test = (risks: RiskValuesType[]) => {
    risks.map((risk) => <GenerateRiskTableFromValues risks={[risk]} />);
  };

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
            <option value="Alderpensjon">Alderpensjon</option>
            <option value="Uføretrygd">Uføretrygd</option>
            <option value="AAP">AAP</option>
            <option value="Sykepenger">Sykepenger</option>
            <option value="Dagpenger">Dagpenger</option>
            <option value="Foreldrepenger">Foreldrepenger</option>
            <option value="Utbetaling">Utbetaling</option>
          </Select>
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Tjeneste/Ytelse</Table.HeaderCell>
            <Table.HeaderCell scope="col">Eier</Table.HeaderCell>
            <Table.HeaderCell scope="col">Antall Risiko</Table.HeaderCell>
            <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
            <Table.HeaderCell scope="col">Endret</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serviceElements.map((element) => (
            <Table.ExpandableRow
              key={element.id}
              content={
                <GenerateRiskTableFromValues risks={element.risk_values} />
              }
            >
              <Table.DataCell scope="row">{service}</Table.DataCell>
              <Table.DataCell>{element.owner_ident}</Table.DataCell>
              <Table.DataCell>{element.risk_values.length}</Table.DataCell>
              <Table.DataCell>
                {formatDate(element.report_created)}
              </Table.DataCell>
              <Table.DataCell>
                {formatDate(element.report_edited)}
              </Table.DataCell>
            </Table.ExpandableRow>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default ShowReports;
