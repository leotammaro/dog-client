import axios from "axios";

export async function geoCordsfromAdress(address) {
  const { data } = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
  );
  console.log(data)
  return data;
}
