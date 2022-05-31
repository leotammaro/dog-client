import React, { useContext, useRef } from "react";
import { Button, Textarea, Input } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Field from "./Field";
import { Controller, useForm } from "react-hook-form";
import { ages, colors, genders, sizes, types, weights } from "../constants/pet";
import Select from "react-select";
import { breeds } from "../data/breeds";
import axios from "axios";
import UserContext from "../context/UserContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { geoCordsfromAdress } from "../service/geolocation";
import { useLocation, useHistory } from "react-router-dom";

function FormAnimalLost({ onSave }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleSubmit, control, watch, reset, setError, clearErrors } =
    useForm();
  const fileRef = useRef();
  const user = useContext(UserContext);
  const selectedType = watch("tipo");
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    setIsOpen(location.pathname === "/app/new-report");
  }, [location]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const {
      tipo,
      raza,
      genero,
      tamaño,
      peso,
      edad,
      color,
      direccion,
      descripcion,
      numeroDeTelefono,
    } = data;
    const storage = getStorage();
    const fileImage = fileRef.current.files[0];
    const imageReportRef = ref(storage, fileImage.name);

    uploadBytes(imageReportRef, fileImage).then(async (photoUrl) => {
      const geoResponse = await geoCordsfromAdress(direccion);
      if (geoResponse.length !== 0) {
        const { lat, lon, display_name } = geoResponse[0];
        const adressReport = display_name.split(",");
        const street = `${adressReport[1]} ${adressReport[0]}`;
        const city = adressReport[3];
        const country = adressReport[5];
        const photoAnimal = photoUrl.metadata.fullPath;

        const petDescription = {
          type: tipo.value,
          breed: raza.value,
          gender: genero.value,
          size: tamaño.value,
          weight: peso.value,
          age: edad.value,
          color: color.value,
          photoURL: photoAnimal,
        };

        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/report`,
          data: {
            pet: petDescription,
            datetime: new Date(),
            location: {
              loc: {
                type: "Point",
                coordinates: [parseFloat(lat), parseFloat(lon)],
              },
              street,
              city,
              country,
            },
            description: descripcion,
            phoneNumber: numeroDeTelefono,
          },
          headers: { Authorization: user.accessToken },
        }).then(() => {
          reset();
          setIsLoading(false);
          onSave();
          goToApp();
        });
      }
    });
  };

  const goToApp = React.useCallback(() => {
    history.push("/app");
  }, [history]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={goToApp}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => setIsLoading(false)} />
          <DrawerHeader fontSize={15}>
            Reporta el animal encontrado
          </DrawerHeader>

          <DrawerBody>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: "El tipo es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Tipo">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Tipo"
                    options={Object.keys(types).map((type) => ({
                      value: type,
                      label: types[type],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="raza"
              control={control}
              rules={{ required: "La raza es requerida" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Raza">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Raza"
                    options={breeds[selectedType?.value]?.map((breed) => ({
                      value: breed,
                      label: breed,
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="color"
              control={control}
              rules={{ required: "El color es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Color">
                  <Select
                    isMulti
                    value={value}
                    onChange={onChange}
                    placeholder="Color"
                    options={Object.keys(colors).map((color) => ({
                      value: color,
                      label: colors[color],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="genero"
              control={control}
              rules={{ required: "El genero es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Genero">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Genero"
                    options={Object.keys(genders).map((gender) => ({
                      value: gender,
                      label: genders[gender],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="tamaño"
              control={control}
              rules={{ required: "El tamaño es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Tamaño">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Tamaño"
                    options={Object.keys(sizes).map((size) => ({
                      value: size,
                      label: sizes[size],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="peso"
              control={control}
              rules={{ required: "El peso es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Peso">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Peso"
                    options={Object.keys(weights).map((weight) => ({
                      value: weight,
                      label: weights[weight],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="edad"
              control={control}
              rules={{ required: "La edad es requerida" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Edad">
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Edad"
                    options={Object.keys(ages).map((age) => ({
                      value: age,
                      label: ages[age],
                    }))}
                  />
                </Field>
              )}
            />
            <Controller
              name="foto"
              control={control}
              rules={{ required: "Debe seleccionar una foto" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Foto">
                  <Input
                    value={value}
                    type="file"
                    border="none"
                    accept="image/*"
                    ref={fileRef}
                    onChange={onChange}
                  />
                </Field>
              )}
            />
            <Controller
              name="direccion"
              control={control}
              rules={{ required: "La direccion es requerida" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Dirección">
                  <Input
                    value={value || ""}
                    onChange={onChange}
                    placeholder={`Dirección donde encontraste al ${
                      selectedType?.value || "animal"
                    }`}
                    fontSize="12px"
                    textOverflow={"ellipsis"}
                  />
                </Field>
              )}
            />
            <Controller
              name="descripcion"
              control={control}
              rules={{ required: "La descripción es requerida" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Descripción">
                  <Textarea
                    placeholder="Descripción"
                    value={value}
                    onChange={onChange}
                  />
                </Field>
              )}
            />
            <Controller
              name="numeroDeTelefono"
              control={control}
              rules={{ required: "El telefono es requerido" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Field error={error?.message} label="Telefono">
                  <Input
                    placeholder="Telefono"
                    value={value || ""}
                    onChange={onChange}
                    fontSize={12}
                  />
                </Field>
              )}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={goToApp}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default FormAnimalLost;
