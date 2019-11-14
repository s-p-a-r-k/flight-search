export interface FlightInfo {
    id: number;
    created_at: string;
    updated_at: string;
    flight_identifier: string;
    flt_num: string;
    scheduled_origin_gate: string;
    scheduled_destination_gate: string;
    out_gmt: string;
    in_gmt: string;
    off_gmt: string;
    on_gmt: string;
    destination: string;
    origin: string;
    destination_full_name: string;
    origin_full_name: string;
}