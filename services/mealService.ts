const API_BASE_URL = 'http://api.vireo.health/v1';

export async function getMeals(date: string) {
  const response = await fetch(`${API_BASE_URL}/meals?date=${date}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.statusText}`);
  }
  return response.json();
}

export async function logMeal(meal: { foodItemId: string; quantity: number; mealType: string }) {
  const response = await fetch(`${API_BASE_URL}/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error(`Failed to log meal: ${response.statusText}`);
  }
  return response.json();
}

export async function getMealDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/meals/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch meal details: ${response.statusText}`);
  }
  return response.json();
}
