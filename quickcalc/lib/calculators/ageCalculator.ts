/**
 * Age Calculation Logic
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  dayOfWeekBorn: string;
  daysUntilNextBirthday: number;
  dayOfWeekNextBirthday: string;
  zodiacSign: string;
  zodiacTrait: string;
  chineseZodiac: string;
  generation: string;
  heartbeats: number;
}

export function getZodiacSign(month: number, day: number): { sign: string; trait: string } {
  // month is 0-indexed (0 = Jan, 11 = Dec)
  const realMonth = month + 1;
  if ((realMonth === 3 && day >= 21) || (realMonth === 4 && day <= 19)) {
    return { sign: "Aries", trait: "Courageous, passionate, energetic, and a natural-born leader." };
  } else if ((realMonth === 4 && day >= 20) || (realMonth === 5 && day <= 20)) {
    return { sign: "Taurus", trait: "Reliable, patient, practical, devoted, and highly grounded." };
  } else if ((realMonth === 5 && day >= 21) || (realMonth === 6 && day <= 20)) {
    return { sign: "Gemini", trait: "Gentle, affectionate, curious, adaptable, and quick-witted." };
  } else if ((realMonth === 6 && day >= 21) || (realMonth === 7 && day <= 22)) {
    return { sign: "Cancer", trait: "Highly imaginative, loyal, deeply emotional, and nurturing." };
  } else if ((realMonth === 7 && day >= 23) || (realMonth === 8 && day <= 22)) {
    return { sign: "Leo", trait: "Creative, passionate, generous, warm-hearted, and cheerful." };
  } else if ((realMonth === 8 && day >= 23) || (realMonth === 9 && day <= 22)) {
    return { sign: "Virgo", trait: "Loyal, highly analytical, kind, hardworking, and deeply practical." };
  } else if ((realMonth === 9 && day >= 23) || (realMonth === 10 && day <= 22)) {
    return { sign: "Libra", trait: "Cooperative, diplomatic, gracious, fair-minded, and highly social." };
  } else if ((realMonth === 10 && day >= 23) || (realMonth === 11 && day <= 21)) {
    return { sign: "Scorpio", trait: "Resourceful, brave, passionate, stubborn, and an incredibly true friend." };
  } else if ((realMonth === 11 && day >= 22) || (realMonth === 12 && day <= 21)) {
    return { sign: "Sagittarius", trait: "Generous, idealistic, optimistic, and possesses a great sense of humor." };
  } else if ((realMonth === 12 && day >= 22) || (realMonth === 1 && day <= 19)) {
    return { sign: "Capricorn", trait: "Responsible, disciplined, highly self-controlled, and deeply independent." };
  } else if ((realMonth === 1 && day >= 20) || (realMonth === 2 && day <= 18)) {
    return { sign: "Aquarius", trait: "Progressive, original, independent, humanitarian, and highly intellectual." };
  } else {
    return { sign: "Pisces", trait: "Compassionate, artistic, intuitive, incredibly gentle, and wise." };
  }
}

export function getChineseZodiac(year: number): string {
  const animals = [
    "Monkey 🐒", "Rooster 🐓", "Dog 🐕", "Pig 🐖",
    "Rat 🐀", "Ox  🐂", "Tiger 🐅", "Rabbit 🐇",
    "Dragon 🐉", "Snake 🐍", "Horse 🐎", "Goat 🐐"
  ];
  return animals[year % 12];
}

export function getGeneration(year: number): string {
  if (year >= 2013) return "Generation Alpha (2013-Present)";
  if (year >= 1997) return "Generation Z (1997-2012)";
  if (year >= 1981) return "Millennials (1981-1996)";
  if (year >= 1965) return "Generation X (1965-1980)";
  if (year >= 1946) return "Baby Boomers (1946-1964)";
  if (year >= 1928) return "Silent Generation (1928-1945)";
  if (year >= 1901) return "Greatest Generation (1901-1927)";
  return "Interbellum or Lost Generation";
}

export function calculateAge(birthDateString: string): AgeResult | string {
  if (!birthDateString) {
    return "Please enter your date of birth.";
  }

  // Ensure no time zone offset shifts by adding T12:00:00 or T00:00:00
  const birth = new Date(birthDateString + "T12:00:00");
  if (isNaN(birth.getTime())) {
    return "Please enter a valid date.";
  }

  const now = new Date();
  // Normalize both dates to midnight for standard days calculation
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  const birthMidnight = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate(), 12, 0, 0, 0);

  if (birthMidnight > today) {
    return "Birth date cannot be in the future.";
  }

  if (birth.getFullYear() < 1900) {
    return "Please enter a year of 1900 or later.";
  }

  // Chronological years, months, days calculation
  let years = today.getFullYear() - birthMidnight.getFullYear();
  let months = today.getMonth() - birthMidnight.getMonth();
  let days = today.getDate() - birthMidnight.getDate();

  if (days < 0) {
    // get days of previous month
    const prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonthDate.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  // Total times
  const diffTime = today.getTime() - birthMidnight.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const heartbeats = totalMinutes * 70; // 70 bpm

  // Day of week born
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeekBorn = daysOfWeek[birthMidnight.getDay()];

  // Next birthday calculation
  let nextBdayYear = today.getFullYear();
  let nextBday = new Date(nextBdayYear, birthMidnight.getMonth(), birthMidnight.getDate(), 12, 0, 0, 0);

  if (nextBday < today) {
    nextBdayYear++;
    nextBday = new Date(nextBdayYear, birthMidnight.getMonth(), birthMidnight.getDate(), 12, 0, 0, 0);
  }

  // Leap birthday exception
  if (birthMidnight.getMonth() === 1 && birthMidnight.getDate() === 29) {
    const isLeap = (nextBdayYear % 4 === 0 && nextBdayYear % 100 !== 0) || (nextBdayYear % 400 === 0);
    if (!isLeap) {
      // Non-leap year: celebrate on Feb 28
      nextBday = new Date(nextBdayYear, 1, 28, 12, 0, 0, 0);
    }
  }

  const diffBdayTime = nextBday.getTime() - today.getTime();
  const daysUntilNextBirthday = Math.ceil(diffBdayTime / (1000 * 60 * 60 * 24));
  const dayOfWeekNextBirthday = daysOfWeek[nextBday.getDay()];

  // Zodiac, Gen, Chinese Zodiac
  const zodiacInfo = getZodiacSign(birthMidnight.getMonth(), birthMidnight.getDate());
  const chineseZodiac = getChineseZodiac(birthMidnight.getFullYear());
  const generation = getGeneration(birthMidnight.getFullYear());

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    dayOfWeekBorn,
    daysUntilNextBirthday,
    dayOfWeekNextBirthday,
    zodiacSign: zodiacInfo.sign,
    zodiacTrait: zodiacInfo.trait,
    chineseZodiac,
    generation,
    heartbeats
  };
}
