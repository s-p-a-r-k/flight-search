# ODS Full Stack Coding Assignment

## Prerequisites

Install NodeJS - https://nodejs.org/en/download/

Install AngularCLI - ```npm install -g @angular/cli```

## How to run

Run the following command from this project's home directory:

```
ng serve --open
```

Your browser will navigate to http://localhost:4200/.

If it is giving errors, you may need to run the following commands as well:
```
npm install --save ng2-smart-table
ng add @angular/material
```

## Assignment

This is a web application that allows a user to search for flights and display the results in a tabular view.

## Features

1. Allow the user to enter a station's (destination or origin) full name or IATA airport code to search flights. Display the results in a table.

2. Provide an auto-suggest feature for station.

3. Provide two RESTful endpoints supporting the functionality listed in steps 1 and 2.

## Datasource

A zipped CSV file of flights has been moved from /data/flights.csv to /src/assets/data/flights.csv. Each row in the CSV file represents a flight.

## Implementation

Used Angular.
