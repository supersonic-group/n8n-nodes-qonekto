import Kunde from './Kunde/Operations';
import KundeTag from './Kunden-Tag/Operations';
import Listen from './Listen/Operations';
import Panda from './Panda/Operations';
import Pipeline from './Pipeline/Operations';
import Misc from './Misc/Operations';

export default [...Kunde, ...KundeTag, ...Listen, ...Panda, ...Pipeline, ...Misc];
