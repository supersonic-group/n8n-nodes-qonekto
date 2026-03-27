import Kunde from './Kunde/Fields';
import KundeTags from './KundeTags/Fields';
import KundeAdditionalAddresses from './KundeAdditionalAddresses/Fields';
import KundeNotes from './KundeNotes/Fields';
import KundeRelations from './KundeRelations/Fields';
import KundeNotifications from './KundeNotifications/Fields';
import Vertrag from './Vertrag/Fields';
import ContractBankAccount from './ContractBankAccount/Fields';
import Listen from './Listen/Fields';
import Panda from './Panda/Fields';
import ClaimsSchaden from './ClaimsSchaden/Fields';
import TasksAufgaben from './TasksAufgaben/Fields';
import Pipeline from './Pipeline/Fields';
import Misc from './Misc/Fields';

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
