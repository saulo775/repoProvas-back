import { Test } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import testRepository from "../repositories/testRepository.js";

export type ICreateTestData = Omit<Test, "id">

async function addNewTest(testData: ICreateTestData) {
    await checkIfTestDataIsValid(testData);
    await testRepository.insertTest(testData);
}

async function checkIfTestDataIsValid(testData:ICreateTestData) {
    const {categoryId, teacherDisciplineId} = testData;
    const category = await testRepository.findCategoryById(categoryId);
    const teacherDiscipline = await testRepository.findTeacherDisciplineById(teacherDisciplineId);

    if (!category) {
        throw new AppError("category not found", 404);
    }

    if (!teacherDiscipline) {
        throw new AppError("teacher discipline not found", 404);
    }
}


const testService = {
    addNewTest,
}

export default testService;