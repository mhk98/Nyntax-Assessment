import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 2,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  signature: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    borderBottom: "1px solid #000",
    width: "40%",
    paddingBottom: 5,
  },
  smallText: {
    fontSize: 8,
  },
});

const ReservationPdf = ({ reservationData }) => (
  // console.log(reservationData);
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.column}>
          <Text style={styles.text}>CH Car Place Inc</Text>
          <Text style={styles.text}>162 Bergen St</Text>
          <Text style={styles.text}>Brooklyn, NY 11213</Text>
          <Text style={styles.text}>PH#</Text>
          <View style={styles.section}>
            <Text style={styles.text}>Monday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Tuesday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Wednesday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Thursday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Friday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Saturday 9:00 AM-6:00 PM</Text>
            <Text style={styles.text}>Sunday 9:00 AM-6:00 PM</Text>
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>RA #{reservationData.reservationId}</Text>
          <Text style={styles.text}>REPAIR ORDER:</Text>
          <Text style={styles.text}>CLAIM:</Text>
          <Text style={styles.text}>
            Date/Time Out: {reservationData.pickupDate}
          </Text>
          <Text style={styles.text}>
            Date/Time In: {reservationData.returnDate}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Renter Info</Text>
        <Text style={styles.text}>
          Name: {reservationData.firstName} {reservationData.lastName}
        </Text>
        <Text style={styles.text}>Email: {reservationData.email}</Text>
        <Text style={styles.text}>Phone: {reservationData.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Additional Authorized Driver(s)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Unit Details</Text>
        <Text style={styles.text}>
          Vehicle Type: {reservationData.vehicleType}
        </Text>
        <Text style={styles.text}>
          Vehicle Make: {reservationData.vehicleMake}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>BILL TO:</Text>
        <Text style={styles.text}>Payment Type: Unpaid</Text>
        <Text style={styles.text}>AUTH: $0.00</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Referral:</Text>
        <Text style={styles.text}>Collision Insurance (CDW)- $7 per day</Text>
        <Text style={styles.text}>
          Limits liability of damages to one's own vehicle up to $1000 in event
          of an accident, by waiving this coverage renter agrees to be hold
          liable for damages up to the entire value of the vehicle.
        </Text>
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.heading}>Charge Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Unit</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
          </View>
          {reservationData.chargeSummary.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.unit}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      </View> */}

      <View style={styles.section}>
        <Text style={styles.heading}>Charge Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Unit</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Hourly</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.hourlyRates}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.hourlyCost}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Daily</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {" "}
                ${reservationData.dailyRates}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${reservationData.dailyCost}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Weekly</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {" "}
                ${reservationData.weeklyRates}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.weeklyCost}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Discount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${reservationData.discount}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Collision Damage Waiver</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.collisionDamageWaiver}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Liability Insurance</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.liabilityInsurance}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rental Tax</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {(reservationData?.rentalTaxRate ?? 0).toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${reservationData.excludingDiscountTotalCost}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.signature}>
        <View>
          <Text style={styles.text}>Renters Signature</Text>
          <View style={styles.signatureBox}></View>
        </View>
        <View>
          <Text style={styles.text}>Additional Driver 1</Text>
          <View style={styles.signatureBox}></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.smallText}>
          Your rental agreement offers, for an additional charge, an optional
          waiver to cover all or a part of your responsibility for damage to or
          loss of the vehicle: Before deciding whether to purchase the waiver,
          you may wish to determine whether your own automobile insurance or
          credit card agreement provides you coverage for rental vehicle damage
          or loss and determine the amount of the deductible under your own
          insurance coverage. The purchase of the waiver is not mandatory. The
          waiver is not Insurance. I acknowledge that I have received and read a
          copy of this.
        </Text>
      </View>
    </Page>
  </Document>
);

export default ReservationPdf;
