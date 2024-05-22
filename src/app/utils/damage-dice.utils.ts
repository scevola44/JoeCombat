export abstract class DamageDiceUtils {

    static sizeList: string[] = [
        "Small",
        "Medium",
        "Large",
        "Huge",
        "Gargantuan",
        "Colossal"
    ];

    static damageDiceTable: string[] =
    [
        "1",
        "1d2",
        "1d3",
        "1d4",
        "1d6",
        "1d8",
        "1d10",
        "2d6",
        "2d8",
        "3d6",
        "3d8",
        "4d6",
        "4d8",
        "6d6",
        "6d8",
        "8d6",
        "8d8",
        "12d6",
        "12d8",
        "16d6"
    ]

    public static getIncreasedDamageDice(currentDie: string, sizeChange: number): string{
        if (currentDie.endsWith("d12")){
            let x = currentDie.split('d');
            let numberOfDice: number = +x[0];

            currentDie = numberOfDice*2 + "d6";
        }

        if (currentDie == "2d10") return "4d8";
        
        let currentDieIndex = this.damageDiceTable.indexOf(currentDie);
        let newIndex: number = currentDieIndex + sizeChange*2;

        return this.damageDiceTable[newIndex];
    }



}