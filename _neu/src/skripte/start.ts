import { geraetKennzeichnen, uebergaengeFreigeben } from './geraet';
import { menueEinrichten } from './menue';
import { titelbildEinrichten } from './titelbild';
import { portraitEinrichten } from './portrait';
import { bildschauEinrichten } from './bildschau';

// Jede Einrichtung prueft selbst, ob ihr Baustein auf dieser Seite steht.
geraetKennzeichnen();
uebergaengeFreigeben();
menueEinrichten();
titelbildEinrichten();
portraitEinrichten();
bildschauEinrichten();
