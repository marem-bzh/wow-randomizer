// TODO English translation of specs and races

jQuery(function ($) {
    // View
    const inputFaction = $("select.inputFaction");
    const outputResult = $(".outputResult");
    const btnGenerate = $(".btnGenerate");

    // Data
    const H = "Horde", A = "Alliance", M = "Male", F = "Female";
    const SHA = "Shaman", DK = "Death Knight", HUN = "Hunter",
        WL = "Warlock", DRU = "Druid", WAR = "Warrior", MAG = "Mage",
        PAL = "Paladin", PRI = "Priest", THI = "Thief", MON = "Monk", DH = "Demon Hunter";

    const factions = [H, A];
    const genders = [M, F];
    const classes = [SHA, HUN, DK, WL, DRU, WAR, MAG, PAL, PRI, THI, MON, DH];
    const specializations = [
        { class: SHA, specs: ["Amélioration", "Elémentaire", "Restauration"] },
        { class: HUN, specs: ["Maîtrise des bêtes", "Précision", "Survie"] },
        { class: DK, specs: ["Givre", "Impie", "Sang"] },
        { class: WL, specs: ["Affliction", "Démonologie", "Destruction"] },
        { class: DRU, specs: ["Equilibre", "Farouche", "Gardien", "Restauration"] },
        { class: WAR, specs: ["Armes", "Fureur", "Protection"] },
        { class: MAG, specs: ["Arcanes", "Feu", "Givre"] },
        { class: PAL, specs: ["Protection", "Sacré", "Vindicte"] },
        { class: PRI, specs: ["Discipline", "Ombre", "Sacré"] },
        { class: THI, specs: ["Assassinat", "Finesse", "Hors-la-loi"] },
        { class: MON, specs: ["Maître brasseur", "Marche-vent", "Tisse-brume"] },
        { class: DH, specs: ["Dévastation", "Vengeance"] }
    ];

    const races = [
        { name: "Elfe de Sang", faction: H, classesLocked: [SHA, DRU] },
        { name: "Gobelin", faction: H, classesLocked: [DH, PAL, MON, DRU] },
        { name: "Mort-Vivant", faction: H, classesLocked: [DH, PAL, SHA, DRU] },
        { name: "Orc", faction: H, classesLocked: [DH, PAL, PRI, DRU] },
        { name: "Tauren", faction: H, classesLocked: [DH, THI, MAG, WL] },
        { name: "Troll", faction: H, classesLocked: [DH, PAL] },
        { name: "Pandaren (Horde)", faction: H, classesLocked: [DH, PAL, DH, DRU] },
        { name: "Pandaren (Alliance)", faction: A, classesLocked: [DH, PAL, DH, DRU] },
        { name: "Draeneï", faction: A, classesLocked: [DH, THI, WL, DRU] },
        { name: "Elfe de la Nuit", faction: A, classesLocked: [PAL, SHA, WL] },
        { name: "Gnome", faction: A, classesLocked: [DH, PAL, SHA, DRU] },
        { name: "Humain", faction: A, classesLocked: [DH, SHA, DRU] },
        { name: "Nain", faction: A, classesLocked: [DH, DRU] },
        { name: "Worgen", faction: A, classesLocked: [DH, PAL, SHA, MON] }
    ];

    // Logic
    function pickFaction() {
        const input = inputFaction.find("option:selected").html();

        if (input === A) return A;
        if (input === H) return H;

        return factions[Math.floor(Math.random() * factions.length)];
    }

    function pickGender() {
        return genders[Math.floor(Math.random() * genders.length)];
    }

    function pickClass() {
        return classes[Math.floor(Math.random() * classes.length)];
    }

    function pickSpecialization(c) { // c as the class
        const availableSpecs = specializations.filter((spec) => {
            return (spec.class === c);
        })[0].specs;

        return availableSpecs[Math.floor(Math.random() * availableSpecs.length)];
    }

    function pickRace(f, c) { // f and c as the faction and the class, respectively
        const compatibleRaces = races.filter((race) => {
            if (race.faction !== f) return false;
            if (race.classesLocked.includes(c)) return false;

            return true;
        });

        return compatibleRaces[Math.floor(Math.random() * compatibleRaces.length)].name;
    }

    // Events
    btnGenerate.on("click", (e) => {
        e.preventDefault();

        const f = pickFaction(), g = pickGender(), c = pickClass(), s = pickSpecialization(c), r = pickRace(f, c);
        outputResult.val(c + " " + s + ", " + r + ", " + g);
    });
});
