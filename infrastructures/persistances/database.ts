/**
 * Database
 * 
 * Buat database palsu untuk menyimpan data dummy student di memori
 */
export class Database {

    // attributes
    private studentData = new Array<{ name: string, email: string }>();

    // setter
    public setItem(data: { name: string, email: string }): boolean {
        const res = this.studentData.push(data);

        if (res === 0) {
            return false
        } else {
            return true;
        } 
    }

    // getter
    public getItemByName(name: string) {
        return this.studentData.find((s) => s.name === name);
    }

    public getAllItem() {
        return this.studentData.map((i) => ({
            name: i.name,
            email: i.email
        }));
    }
}