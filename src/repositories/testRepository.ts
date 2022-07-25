import prisma from '../config/database.js';
import { ICreateTestData } from './../services/testService.js';

async function insertTest(testData: ICreateTestData) {
    const test = await prisma.test.create({data: testData});
    return test;
}

async function findCategoryById(categoryId:number) {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });
    return category;
}

async function findTeacherDisciplineById(teacherDisciplineId:number) {
    const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
        where: {
            id: teacherDisciplineId
        }
    });
    return teacherDiscipline;
}



const testRepository = {
    insertTest,
    findCategoryById,
    findTeacherDisciplineById
}

export default testRepository;