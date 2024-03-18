import '../App.css';
import ProductsTable from './Tables/ProductsTable';
import { SelectionProvider } from './SelectionContext';
import DoneModal from './Modals/DoneModal';
const Add = () => {

    return (
        <div className="table-container">
            <SelectionProvider>
                <ProductsTable />
                <DoneModal/>
            </SelectionProvider>
        </div>
    );
};
export default Add;