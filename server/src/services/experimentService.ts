import { fileTypes, Storage } from "./storage/storageTypes";
import { Collections } from "./collections/collectionsTypes";
import { PythonScriptInterface } from "./pythonScripts/pythonScriptsTypes";


export class ExperimentService{
    private collectionsService : Collections;
    private storageService: Storage;
    private pythonService: PythonScriptInterface;

    constructor({collectionsService,storageService,pythonService}){
        this.collectionsService = collectionsService;
        this.storageService = storageService;
        this.pythonService = pythonService;
    }

    addAutomaticAlgorithms = async (name, buffer) => {
        const path = `automatic-algos/${name}`
        await this.storageService.uploadBuffer(`automatic-algos/${name}`, buffer, fileTypes.Text);
        await this.collectionsService.automaticAlgos().add(name,{
            name,
            path,
        });
    };

    addImage = async (name, buffer) => {
        const files = await this.pythonService.processImage(buffer)
        await this.storageService.uploadBuffer(`images/${name}/image`, buffer, fileTypes.Image);
        await this.storageService.uploadBuffer(`images/${name}/text`, new Buffer(files.text), fileTypes.Text);
        await this.storageService.uploadBuffer(`images/${name}/word_ocr`, files.word_ocr, fileTypes.Csv);
        await this.storageService.uploadBuffer(`images/${name}/base_sent_table`, files.base_sent_table, fileTypes.Csv);
        await this.collectionsService.images.add('name',{
            name,
            uploaded_date: Date.now(),
            text_path: `images/${name}/text`,
            word_ocr_path: `images/${name}/word_ocr`,
            base_sent_table_path: `images/${name}/base_sent_table`,
        })
    }

    //TODO - check if exists download if needed
    // we could check with in memory data
    private verifyAutomaticAlgorithmExists = async (names: string[]) => {};

    runAutomaticAlgs = async (algsNames: string[], imageName:string, options: {text?: Buffer, base_sent_table?: Buffer } ) => {
        const text = options.text || await this.storageService.downloadToBuffer(`images/${imageName}/text`);
        const base_sent_table = options.base_sent_table || await this.storageService.downloadToBuffer(`images/${imageName}/base_sent_table`);
        await this.verifyAutomaticAlgorithmExists(algsNames);
        const {tables} = await this.pythonService.runAutomaticAlgs(algsNames, text,base_sent_table);
        //should replace in foreach-await 
        tables.forEach(async row => {
            const path = `images/${imageName}/algs/${row.name}`;
            await this.storageService.uploadBuffer(path, row.sent_table, fileTypes.Csv);
            await this.collectionsService.images.sentTablesOf(imageName).add(row.name,{
                type: 'automatic',
                name: row.name,
                path
            })
        })
    }
    

}