export type ExpenseCategory =
  | "mileage"
  | "lodging"
  | "rentalCar"
  | "meals"
  | "internet"
  | "rideshare"
  | "airfare";

export type PerDayRule = {
  perDay: number;
};
export type PerTripRule = {
  perTrip: number;
};

export type PerMileRule = {
  perMile: number;
};

export type TravelPolicyRule = PerDayRule | PerTripRule | PerMileRule;
export type TravelPolicyRules = Record<ExpenseCategory, TravelPolicyRule>;

export interface TravelPolicy {
  id: string;
  name: string;
  rules: TravelPolicyRules;
}

const defaultTravelPolicy: TravelPolicy = {
  id: "default",
  name: "Default",
  rules: {
    mileage: {
      perMile: 0.42,
    },
    airfare: {
      perTrip: 2000,
    },
    lodging: {
      perDay: 275,
    },
    meals: {
      perDay: 75,
    },
    rideshare: {
      perDay: 75,
    },
    rentalCar: {
      perDay: 75,
    },
    internet: {
      perDay: 20,
    },
  },
};

const unlimitedAirfareTravelPolicy: TravelPolicy = {
  id: "unlimitedAirfare",
  name: "Unlimited Airfare",
  rules: {
    ...defaultTravelPolicy.rules,
    airfare: {
      perTrip: Number.MAX_VALUE,
    },
  },
};

export { defaultTravelPolicy, unlimitedAirfareTravelPolicy };
