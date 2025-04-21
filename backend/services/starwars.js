const url = process.env.SW_API_URL;

const getData = async (type, name) => {
  try {
    let results = [];
    const response = await fetch(`${url}/${type}?search=${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const firstData = await response.json();

    results.push(...firstData.results);

    const totalPages = Math.ceil(firstData.count / 10);
    if (totalPages <= 1) return results;

    const fetches = [];
    for (let i = 2; i <= totalPages; i++) {
      fetches.push(
        fetch(`${url}/${type}?search=${encodeURIComponent(name)}&page=${i}`)
      );
    }

    const responses = await Promise.all(fetches);

    for (const res of responses) {
      if (!res.ok) throw new Error("Error getting people");
    }

    const dataArray = await Promise.all(responses.map((res) => res.json()));
    for (const data of dataArray) {
      results.push(...data.results);
    }

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getDetail = async (type, id) => {
  try {
    const response = await fetch(`${url}/${type}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getMultipleData = async (type, arr) => {
  const fetches = [];
  const results = [];

  for (let item of arr) {
    fetches.push(fetch(`${url}/${type}/${item}`));
  }

  const responses = await Promise.all(fetches);

  for (const res of responses) {
    if (!res.ok) throw new Error("Error getting data");
  }

  const dataArray = await Promise.all(responses.map((res) => res.json()));

  for (const data of dataArray) {
    results.push({ ...data });
  }

  return results;
};

module.exports = {
  getData,
  getDetail,
  getMultipleData,
};
