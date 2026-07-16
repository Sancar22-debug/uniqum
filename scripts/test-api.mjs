async function test() {
  const url = process.env.AMOCRM_TEST_URL || "https://uniqumsport.kg/api/amocrm";
  const body = {
    name: "Test Name",
    phone: "+996500123456",
    age: "20"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    // We want the text body whether it's 200 or 400
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response Body:\n${text}`);
  } catch (e) {
    console.error("Test script error:", e);
  }
}
test();
