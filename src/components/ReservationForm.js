import React, { useEffect, useState } from "react";
import { useGetAllCartQuery } from "../features/cart/cart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReservationPdf from "./ReservationPdf";

const ReservationForm = () => {
  const { data, isLoading, isError, error } = useGetAllCartQuery();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    reservationId: "",
    pickupDate: "",
    returnDate: "",
    duration: "",
    discount: 0,
    vehicleType: "",
    vehicleMake: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    collisionDamageWaiver: 9,
    liabilityInsurance: 15,
    rentalTax: 11.5,
    totalCost: 0,
    hourlyCost: 0,
    dailyCost: 0,
    weeklyCost: 0,
    excludingDiscountTotalCost: 0,
    totalHours: 0,
    totalDays: 0,
    totalWeeks: 0,
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching data:", error);
    } else if (!isLoading) {
      if (data && data.data) {
        setProducts(data.data);
      }
    }
  }, [data, isLoading, isError, error]);

  useEffect(() => {
    calculateDuration();
    calculateTotalCost();
  }, [
    formData.pickupDate,
    formData.returnDate,
    formData.discount,
    formData.vehicleMake,
    formData.collisionDamageWaiver,
    formData.liabilityInsurance,
    formData.rentalTax,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateDuration = () => {
    const pickupDate = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);

    if (pickupDate && returnDate && pickupDate < returnDate) {
      const totalHours = Math.abs(returnDate - pickupDate) / 36e5;
      const weeks = Math.floor(totalHours / 168);
      const days = Math.floor((totalHours % 168) / 24);
      const hours = Math.floor(totalHours % 24);

      setFormData((prevData) => ({
        ...prevData,
        duration: `${weeks} Weeks ${days} Days ${hours} Hours`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        duration: "",
      }));
    }
  };

  const calculateTotalCost = () => {
    const selectedCar = products.find(
      (car) => car.make === formData.vehicleMake
    );
    if (!selectedCar) return;

    const duration = formData.duration;
    const durationObject = parseDuration(duration);

    const totalHours = calculateTotalHours(durationObject);

    const hourlyCost = durationObject.hours * selectedCar.rates.hourly;
    const dailyCost =
      Math.ceil(durationObject.days / 24) * selectedCar.rates.daily;
    const weeklyCost =
      Math.ceil(durationObject.weeks / 168) * selectedCar.rates.weekly;

    console.log("costCalculations", hourlyCost, dailyCost, weeklyCost);

    const discount = parseFloat(formData.discount) || 0;
    const collisionDamageWaiver =
      parseFloat(formData.collisionDamageWaiver) || 0;
    const liabilityInsurance = parseFloat(formData.liabilityInsurance) || 0;
    const rentalTaxRate = parseFloat(formData.rentalTax) / 100 || 0;

    // cost -= discount;
    // cost += collisionDamageWaiver + liabilityInsurance;
    // cost += cost * rentalTaxRate;

    const otherCost =
      collisionDamageWaiver + liabilityInsurance + rentalTaxRate;
    const rentalCost = hourlyCost + dailyCost + weeklyCost + otherCost;
    const excludingDiscountTotalCost = rentalCost - discount;

    setFormData((prevData) => ({
      ...prevData,
      // totalCost: cost.toFixed(2),
      hourlyCost: hourlyCost.toFixed(2),
      dailyCost: dailyCost.toFixed(2),
      weeklyCost: weeklyCost.toFixed(2),
      excludingDiscountTotalCost: excludingDiscountTotalCost.toFixed(2),
      totalHours: durationObject.hours,
      totalDays: durationObject.days,
      totalWeeks: durationObject.weeks,
      hourlyRates: selectedCar.rates.hourly,
      dailyRates: selectedCar.rates.daily,
      weeklyRates: selectedCar.rates.weekly,
      discount: discount,
      collisionDamageWaiver: collisionDamageWaiver,
      rentalTaxRate: rentalTaxRate,
      liabilityInsurance: liabilityInsurance,
    }));
  };

  const parseDuration = (duration) => {
    const durationArray = duration.split(" ");
    const durationObject = {};

    for (let i = 0; i < durationArray.length; i += 2) {
      const value = parseInt(durationArray[i]);
      const unit = durationArray[i + 1].toLowerCase();
      durationObject[unit] = value;
    }

    return durationObject;
  };

  const calculateTotalHours = (durationObject) => {
    let totalHours = 0;

    if (durationObject.weeks) {
      totalHours += durationObject.weeks * 168;
    }
    if (durationObject.days) {
      totalHours += durationObject.days * 24;
    }
    if (durationObject.hours) {
      totalHours += durationObject.hours;
    }

    return totalHours;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Logic to submit form data to the backend
  //   console.log("Form Data:", formData);
  //   console.log("hourlyCost", formData.hourlyCost);
  // };

  const selectedCar = products.find((car) => car.make === formData.vehicleMake);

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="grid sm:grid-cols-1 md:grid-cols-4 items-center gap-4 mb-8">
        <div className="flex justify-center md:justify-start md:col-span-3">
          <h2 className="text-2xl font-bold">Reservation</h2>
        </div>
        <div className="flex justify-center md:justify-end">
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            <PDFDownloadLink
              document={<ReservationPdf reservationData={formData} />}
              fileName="reservation.pdf"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Print / Download"
              }
            </PDFDownloadLink>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-[#5D5CFF] border-b">
              Reservation Details
            </h3>
            <div className="border p-4 rounded-lg ">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Reservation ID
                </label>
                <input
                  type="text"
                  name="reservationId"
                  value={formData.reservationId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Pickup Date
                </label>
                <input
                  type="datetime-local"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Return Date
                </label>
                <input
                  type="datetime-local"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  readOnly
                  className="w-full p-2 border rounded-lg"
                  placeholder="Duration"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-6 border-[#5D5CFF] border-b">
              Vehicle Information
            </h3>
            <div className="border p-4 rounded-lg mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="" disabled selected>
                    Select A Vehicle
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.type}>
                      {product.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Vehicle
                </label>
                <select
                  name="vehicleMake"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="" disabled selected>
                    Select A Vehicle
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.make}>
                      {product.make} {product.model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-[#5D5CFF] border-b">
            Customer Information
          </h3>
          <div className="border p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 border-[#5D5CFF] border-b">
              Additional Charges
            </h3>

            <div className="space-y-4 border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="collisionDamageWaiver"
                    checked={formData.collisionDamageWaiver > 0}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "collisionDamageWaiver",
                          value: e.target.checked ? 9 : 0,
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <label className="text-gray-700">
                    Collision Damage Waiver
                  </label>
                </div>
                <span className="text-gray-700">
                  ${formData.collisionDamageWaiver.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="liabilityInsurance"
                    checked={formData.liabilityInsurance > 0}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "liabilityInsurance",
                          value: e.target.checked ? 15 : 0,
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <label className="text-gray-700">Liability Insurance</label>
                </div>
                <span className="text-gray-700">
                  ${formData.liabilityInsurance.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rentalTax"
                    checked={formData.rentalTax > 0}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "rentalTax",
                          value: e.target.checked ? 11.5 : 0,
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <label className="text-gray-700">Rental Tax</label>
                </div>
                <span className="text-gray-700">
                  {formData.rentalTax.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="text-xl font-semibold mb-4 border-[#5D5CFF] border-b">
            Charges Summary
          </h3>

          <div className="border p-4 rounded-lg bg-[#DFDFFF]">
            <table className="min-w-full text-left text-sm ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Charge</th>
                  <th className="py-2 px-4 border-b">Unit</th>
                  <th className="py-2 px-4 border-b">Rate</th>
                  <th className="py-2 px-4 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Displaying an example of a charge; these should be updated based on the selected vehicle and form inputs */}
                <tr>
                  <td className="py-2 px-4 border-b">Hourly</td>
                  <td className="py-2 px-4 border-b">${formData.totalHours}</td>
                  <td className="py-2 px-4 border-b">
                    {selectedCar && `$${selectedCar.rates.hourly}`}
                  </td>
                  <td className="py-2 px-4 border-b">${formData.hourlyCost}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Daily</td>
                  <td className="py-2 px-4 border-b">${formData.totalDays}</td>
                  <td className="py-2 px-4 border-b">
                    {selectedCar && `$${selectedCar.rates.daily}`}
                  </td>
                  <td className="py-2 px-4 border-b">${formData.dailyCost}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Weekly</td>
                  <td className="py-2 px-4 border-b">${formData.totalWeeks}</td>
                  <td className="py-2 px-4 border-b">
                    {selectedCar && `$${selectedCar.rates.weekly}`}
                  </td>
                  <td className="py-2 px-4 border-b">${formData.weeklyCost}</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b">
                    Collision Damage Waiver
                  </td>
                  <td className="py-2 px-4 border-b"></td>
                  <td className="py-2 px-4 border-b">$9.00</td>
                  <td className="py-2 px-4 border-b">$9.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-2 px-4 font-bold border-t">Total</td>
                  <td className="py-2 px-4 border-t"></td>
                  <td className="py-2 px-4 border-t"></td>
                  <td className="py-2 px-4 font-bold border-t">
                    ${formData.excludingDiscountTotalCost}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
