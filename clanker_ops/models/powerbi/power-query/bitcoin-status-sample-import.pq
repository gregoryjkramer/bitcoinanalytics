// Intended Power BI query/table name: fact_bitcoin_node_status
// This sample uses a relative-path-friendly repository path. Power BI Desktop may
// require selecting data/sample/bitcoin_status_observations.csv manually depending
// on the local clone location.
let
    Source = Csv.Document(
        File.Contents("data/sample/bitcoin_status_observations.csv"),
        [Delimiter = ",", Columns = 8, Encoding = 65001, QuoteStyle = QuoteStyle.Csv]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),
    fact_bitcoin_node_status = Table.TransformColumnTypes(
        #"Promoted Headers",
        {
            {"observation_utc", type datetimezone},
            {"source_system", type text},
            {"node_sync_percent", type number},
            {"is_node_synced", type logical},
            {"mempool_fee_sat_vb", Int64.Type},
            {"lightning_channels_health", type text},
            {"status_text", type text},
            {"created_by", type text}
        }
    )
in
    fact_bitcoin_node_status
