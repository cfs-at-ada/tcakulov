import { geraetKennzeichnen, titelhoeheFestlegen, uebergaengeFreigeben, vorlaufEinrichten } from './geraet';
import { menueEinrichten } from './menue';
import { portraitEinrichten } from './portrait';
import { bildschauEinrichten } from './bildschau';
import { terminstandAktualisieren } from './terminstand';
import { einbettungenEinrichten } from './einbettung';
import { kopierenEinrichten } from './kopieren';

// Jede Einrichtung prueft selbst, ob ihr Baustein auf dieser Seite steht.
geraetKennzeichnen();
titelhoeheFestlegen();
vorlaufEinrichten();
uebergaengeFreigeben();
menueEinrichten();
portraitEinrichten();
bildschauEinrichten();
terminstandAktualisieren();
einbettungenEinrichten();
kopierenEinrichten();
