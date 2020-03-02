import { BaseCollectionMock } from "./baseCollection.mock";
import { SentTableMock } from "./sentTables.mock";
import { Images } from "../../firebase/dal/images";

export class ImagesMock extends BaseCollectionMock implements Images {
    collection;

    constructor(collection){
        super(collection);
        this.collection = collection;
    }
    sentTablesOf = (imageName: string) => {
        return this.getSubCollectionOf(imageName,'sent_table',SentTableMock);
    }
}