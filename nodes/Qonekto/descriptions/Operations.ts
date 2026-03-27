import Kunde from './Kunde/Operations';
import KundeTags from './KundeTags/Operations';
import KundeAdditionalAddresses from './KundeAdditionalAddresses/Operations';
import KundeNotes from './KundeNotes/Operations';
import KundeRelations from './KundeRelations/Operations';
import KundeNotifications from './KundeNotifications/Operations';
import Vertrag from './Vertrag/Operations';
import ContractBankAccount from './ContractBankAccount/Operations';
import Listen from './Listen/Operations';
import Panda from './Panda/Operations';
import ClaimsSchaden from './ClaimsSchaden/Operations';
import TasksAufgaben from './TasksAufgaben/Operations';
import Pipeline from './Pipeline/Operations';
import Misc from './Misc/Operations';

export default [
	...Kunde,
	...KundeTags,
	...KundeAdditionalAddresses,
	...KundeNotes,
	...KundeRelations,
	...KundeNotifications,
	...Vertrag,
	...ContractBankAccount,
	...Listen,
	...Panda,
	...ClaimsSchaden,
	...TasksAufgaben,
	...Pipeline,
	...Misc,
];
