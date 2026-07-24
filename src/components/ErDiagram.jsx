import React from "react";

export default function ErDiagram({ schemaTables }) {
  return (
    <div className="er-diagram-container">
      <div className="er-header">
        <h3>📐 Relational ER Schema Diagram</h3>
        <p className="text-muted text-sm">
          Normalized relational structure showcasing Primary Key (PK) & Foreign Key (FK) constraints.
        </p>
      </div>

      <div className="schema-tables-grid">
        {schemaTables.map((table) => (
          <div key={table.tableName} className="card-box schema-card">
            <div className="schema-table-header">
              <span className="table-icon">📋</span>
              <h4 className="schema-table-title">{table.tableName} Table</h4>
            </div>

            <table className="mini-table schema-table-details">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {table.columns.map((col) => (
                  <tr key={col.name}>
                    <td className="font-mono font-bold text-info">{col.name}</td>
                    <td className="font-mono text-xs text-muted">{col.type}</td>
                    <td>
                      {col.key === "PK" && <span className="badge badge-pk">PK</span>}
                      {col.key === "FK" && <span className="badge badge-fk">FK</span>}
                      {col.key === "UNIQUE" && <span className="badge badge-unique">UQ</span>}
                    </td>
                    <td className="text-xs">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="card-box mt-4 fk-relationship-box">
        <h4>🔗 Foreign Key Relationship Mappings</h4>
        <ul className="text-sm">
          <li><strong>Products.supplier_id</strong> ➔ references <strong>Suppliers.supplier_id</strong> (Many-to-One)</li>
          <li><strong>Sales_Transactions.product_id</strong> ➔ references <strong>Products.product_id</strong> (Many-to-One)</li>
        </ul>
      </div>
    </div>
  );
}
