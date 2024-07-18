import { Table } from "@navikt/ds-react";
import React, { useState } from "react";
import GenerateMeasureTableFromValue from "./GenerateMeassureTableFromValue";
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
interface Props {
  risks: RiskValuesType[];
}

function GenerateRiskTableFromValues({ risks }: Props) {
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Risiko ID</Table.HeaderCell>
            <Table.HeaderCell scope="col">Kategori</Table.HeaderCell>
            <Table.HeaderCell scope="col">Sannsynlighet</Table.HeaderCell>
            <Table.HeaderCell scope="col">Konsekvens</Table.HeaderCell>
            <Table.HeaderCell scope="col">Avhengighet?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {risks.map((item, index) => (
            <Table.ExpandableRow
              key={index}
              content={
                item.measureValues.length > 0 ? (
                  <GenerateMeasureTableFromValue measure={item.measureValues} />
                ) : (
                  "Ingen tiltak"
                )
              }
            >
              <Table.DataCell scope="row">{`R${index + 1}`}</Table.DataCell>
              <Table.DataCell>{item.category}</Table.DataCell>
              <Table.DataCell>{item.probability}</Table.DataCell>
              <Table.DataCell>{item.consequence}</Table.DataCell>
              <Table.DataCell>
                {item.dependent ? "Avhengig" : "Ikke avhengig"}
              </Table.DataCell>
            </Table.ExpandableRow>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default GenerateRiskTableFromValues;
