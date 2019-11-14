import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableService } from './table.service';
import { FlightInfo } from './FlightInfo';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  filteredStations: Observable<Station[]>;
  usersForm: FormGroup;
  flightInfo: FlightInfo[];
  stations: Station[] = [];

  constructor(private fb: FormBuilder, private tservice: TableService) {}

  ngOnInit() {
    this.tservice.getFlightData().subscribe(data => {
      this._extractData(data);
      this._groupData();
    });

    this.usersForm = this.fb.group({
      userInput: ''
    })

    this.filteredStations = this.usersForm.get('userInput').valueChanges
      .pipe(
        debounceTime(300),
        map(value => this._filter(value))
      );
  }

  private _extractData(res) {
    let allTextLines = res.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
                tarr[headers[j]] = data[j];
            }

            lines.push(tarr);
        }
    }

    this.flightInfo = lines;
  }

  private _groupData() {
    let grouped = this.flightInfo.reduce(function(r, a) {
      r[a.origin] = r[a.origin] || [];
      r[a.origin].push(a);

      r[a.destination] = r[a.destination] || [];
      r[a.destination].push(a);

      return r;
    }, Object.create(null));

    for (let key in grouped) {
      if (grouped[key][0]["origin"] == key) {
        this.stations.push({station: key, fullName: grouped[key][0]["origin_full_name"], flightInfo: grouped[key]});
      } else {
        this.stations.push({station: key, fullName: grouped[key][0]["destination_full_name"], flightInfo: grouped[key]});
      }
    }
  }

  private _filter(value: string | Station): Station[] {
    let filterValue: string;

    if (typeof value === "string") {
      filterValue = this._normalizeValue(value);
    } else {
      filterValue = this._normalizeValue(value.station);
    }

    let result = this.stations.filter(station => this._normalizeValue(station.station).includes(filterValue) || this._normalizeValue(station.fullName).includes(filterValue));
    
    return result;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public displayFn(user: Station) {
    if (user) { return user.station; }
  }

  public isValid(value): boolean {
    return typeof value !== null && typeof value !== "undefined" && typeof value !== "string";
  }

  public getInfo(value: Station): FlightInfo[] {
    return value.flightInfo;
  }

  settings = {
    columns: {
      origin_full_name: {
        title: 'Origin Full Name',
        filter: false
      },
      origin: {
        title: 'Origin',
        filter: false
      },
      scheduled_origin_gate: {
        title: 'Scheduled Origin Gate',
        filter: false
      },
      destination_full_name: {
        title: 'Destination Full Name',
        filter: false
      },
      destination: {
        title: 'Destination',
        filter: false
      },
      scheduled_destination_gate: {
        title: 'Scheduled Destination Gate',
        filter: false
      },
      id: {
        title: 'ID',
        filter: false
      },
      created_at: {
        title: 'Created At',
        filter: false
      },
      updated_at: {
        title: 'Updated At',
        filter: false
      },
      flight_identifier: {
        title: 'Flight Identifier',
        filter: false
      },
      flt_num: {
        title: 'Flight Number',
        filter: false
      },
      out_gmt: {
        title: 'Out GMT',
        filter: false
      },
      in_gmt: {
        title: 'In GMT',
        filter: false
      },
      off_gmt: {
        title: 'Off GMT',
        filter: false
      },
      on_gmt: {
        title: 'On GMT',
        filter: false
      }
    },
    editable: false,
    actions: false
  };
}

export interface Station {
  station: string;
  fullName: string;
  flightInfo: FlightInfo[];
}