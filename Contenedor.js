const fs = require("fs");

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }
  // recieve a new object, save in the file and returns the id
  async save(data) {
    try {
      let content = await fs.promises.readFile(this.filename, "utf-8");
      if (content.length > 0) {
        content = JSON.parse(content);
        content.push(data);
        data.id = content[content.length - 2].id + 1;
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(content, null, 2)
        );
        return data.id;
      } else {
        content = [];
        data.id = 1;
        content.push(data);
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify([data], null, 2),
          "utf-8"
        );
        return data.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      //function to check that the id exist
      const checkId = (item) => item.id === id;
      // read and parse the content
      let content = JSON.parse(
        await fs.promises.readFile(this.filename, "utf-8")
      );
      // checking if the file is not empty and filter the desire id
      if (content.length > 0) {
        if (content.some(checkId)) {
          return content.filter((item) => item.id === id);
        } else {
          console.log(
            `El item con id: ${id} no se encuentra en el archivo ${this.filename}`
          );
          return null;
        }
      } else {
        console.log(`El archivo ${this.filename} esta vacio`);
      }
    } catch (error) {
      console.log(`Error: Archivo no encontrado o vacio ${error}`);
    }
  }

  async getAll() {
    try {
      //reading the file
      let content = await fs.promises.readFile(this.filename, "utf-8");
      //checking if the file is not empty and parse it
      if (content.length > 0) {
        console.log(`Obteniendo todas las entradas de: ${this.filename} ....`);
        return JSON.parse(content);
      } else {
        console.log(`El archivo ${this.filename} esta vacio`);
        return null;
      }
    } catch (error) {
      console.log(`Error: el archivo ${this.filename} no fue encontrado`);
    }
  }
  async deleteById(id) {
    try {
      // function to check that the id exist
      const checkId = (item) => item.id === id;
      //read and parse the content
      let content = JSON.parse(
        await fs.promises.readFile(this.filename, "utf-8")
      );
      //checking if the file is not empty and filter the items that
      // doesn't match the id argument and return it within the content variable
      if (content.length > 0) {
        if (content.some(checkId)) {
          console.log(`Borrando el archivo con id: ${id}`);
          content = content.filter((item) => {
            return item.id !== id;
          });
        } else {
          console.log(
            `El item con id: ${id} no se encuentra en el archivo ${this.filename}`
          );
          return null;
        }
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(content, null, 2),
          "utf8"
        );
      } else {
        console.log(`El archivo ${this.filename} esta vacio`);
        return null;
      }
    } catch (error) {
      console.log(
        `El archivo ${this.filename} no fue encontrado o esta vacio${error} `
      );
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filename, [], "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
   random() {
      let content = JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
      return content[Math.floor(Math.random()*content.length)]
    //   [Math.floor(Math.random()*content.length)]
  }
}

module.exports = Contenedor;