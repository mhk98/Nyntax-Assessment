## Getting Started

Follow these steps to run and test the project:

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mhk98/Nyntax-Assessment.git

   ```

2. Open command prompt and type cd Nyntax-Assessmen
3. npm install (Install project dependencies)
4. npm start (Run the Nyntax-Assessmen project)
5. The server will be running at http://localhost:3000

# Car Rental System

## Overview

This backend system calculates the total rental charges based on the rental duration, car rates, discounts, and additional charges. The system ensures the customer always gets the best rate by comparing hourly, daily, and weekly rates.

## Features

- Calculates total rental charges based on duration and car rates.
- Compares hourly, daily, and weekly rates to ensure the customer pays the lowest possible amount.
- Applies discounts and additional charges.
- Handles edge cases such as renting a car for a duration that falls between different rate categories.

## Example Scenario

### Tesla Rental Rates

- Hourly rate: $10/hour
- Daily rate: $50/day

### Calculation for a 6-Hour Rental

1. **Input**:

   - Rental duration: 6 hours

2. **Cost Calculation**:

   - Hourly cost: 6 \* $10 = $60
   - Daily cost: $50

3. **Best Rate**:

   - The daily rate of $50 is cheaper than the hourly cost of $60.

4. **Final Charge**:
   - The customer is charged $50 for 6 hours, ensuring they pay the lowest possible rate.

## Handling Rate Comparisons

To ensure customers are not overcharged, the system compares the total cost for the rental duration against the daily and weekly rates. For example, if renting a Tesla for 6 hours, the system charges the daily rate of $50 instead of $60 for hourly.


## Conclusion

This system ensures fair pricing for car rentals by comparing different rate categories and always selecting the best option for the customer. Discounts and additional charges are also seamlessly integrated into the final calculation.

# Invoice Issue

I found your invoice to be disorganized. Therefore, I have created this invoice myself.
