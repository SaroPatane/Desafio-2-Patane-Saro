const fs = require('fs/promise')


class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(obj){
        try {
            const objs = await this.getAll();

        let newId;
        if (objs.length == 0){
            newId = 1
        }
     else {
        newId = objs [objs.length - 1].id + 1
    }
        const newObj = {id: newId, ...obj}
        objs.push(newObj);

        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        return newId;

        
            
        } catch (error) {
            console.log('error al guardar');
            throw new Error(`Error al guardar: ${error}`)
        }

    }

    getById(id, newObj){
        try {
            const objs = await this.getAll();
            const indexObj = objs.findIndex((o)=> o.id == id);
            if (indexObj == -1){
                return "objecto no encontrado"
            }else{
                objs[indexobj] = {id, ...newObj};
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            }
            return {id, ...newObj}
        } catch (error) {
            console.log("error al llamar")
        }
    }

    async getAll() {
        try {
            const objs = await readFile(this.ruta, 'utf-8');

            return JSON.parse(objs);
        } catch (error) {
            console.log("Array Vacio")
        }
    }

    async deleteById(id){
        try {
            const objs = await this.listarAll();
        const indexObj = objs.findIndex((o)=> o.id == id);

        if (indexObj == -1){
            return "Elemento no encontrado"
        } else{
            objs.splice(indexObj, 1);
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        }
        } catch (error) {
            return "No se pudo eliminar"
        }
    }

         deleteAll(){
        try {
            const objs = []
        } catch (error) {
            console.log("No se pudo borrar nada")
        }
    }

}

async function main(){
    const contenedor1 = new Contenedor('./contenedor-data.json');
    console.log(await contenedor1.getAll());
    console.log(await contenedor1.save({titulo:"titulo 1", autor:"autor 1"}));
    console.log(await contenedor1.getById(2, {titulo:"titulo 2", autor:"autor 2"}));
}

main ();
