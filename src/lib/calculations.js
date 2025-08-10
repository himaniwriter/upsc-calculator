import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

export function calculateAge(dateOfBirth, cutoffDate) {
  const birthDate = new Date(dateOfBirth);
  const cutoff = new Date(cutoffDate);
  
  const years = differenceInYears(cutoff, birthDate);
  const months = differenceInMonths(cutoff, birthDate) % 12;
  const days = differenceInDays(
    cutoff, 
    new Date(birthDate.getFullYear() + years, birthDate.getMonth() + months, birthDate.getDate())
  );
  
  return { years, months, days };
}

export function isEligibleForUPSC(age, category = 'general', attempts = 0) {
  // Age limits by category
  const ageLimits = {
    general: { min: 21, max: 32 },
    obc: { min: 21, max: 35 },
    sc_st: { min: 21, max: 37 },
    pwd_general: { min: 21, max: 42 },
    pwd_obc: { min: 21, max: 45 },
    pwd_sc_st: { min: 21, max: 47 },
    ews: { min: 21, max: 32 }
  };
  
  // Attempt limits by category
  const attemptLimits = {
    general: 6,
    obc: 9,
    sc_st: Infinity,
    pwd_general: 9,
    pwd_obc: 9,
    pwd_sc_st: Infinity,
    ews: 6
  };
  
  const ageLimit = ageLimits[category] || ageLimits.general;
  const attemptLimit = attemptLimits[category] || attemptLimits.general;
  
  const ageEligible = age >= ageLimit.min && age <= ageLimit.max;
  const attemptsEligible = attempts < attemptLimit;
  
  return {
    eligible: ageEligible && attemptsEligible,
    ageEligible,
    attemptsEligible,
    remainingAttempts: Math.max(0, attemptLimit - attempts),
    ageLimit,
    attemptLimit
  };
}

export function calculateUPSCPrelimsScore(correctAnswers, wrongAnswers, totalQuestions = 100) {
  const marksPerCorrect = 2;
  const negativeMarking = 0.66;
  
  const positiveMarks = correctAnswers * marksPerCorrect;
  const negativeMarks = wrongAnswers * negativeMarking;
  const totalMarks = positiveMarks - negativeMarks;
  const unattempted = totalQuestions - (correctAnswers + wrongAnswers);
  const accuracy = correctAnswers > 0 ? (correctAnswers / (correctAnswers + wrongAnswers)) * 100 : 0;
  
  return {
    totalMarks: Math.round(totalMarks * 100) / 100,
    positiveMarks,
    negativeMarks: Math.round(negativeMarks * 100) / 100,
    unattempted,
    accuracy: Math.round(accuracy * 100) / 100,
    attemptedQuestions: correctAnswers + wrongAnswers
  };
}