//student interface

interface Student {
  id: number;
  name: string;
  age: number;
  grades: number[];
}

//average grade
function averageGrade(students: Student[]): number {
  let totalGrade = 0;
  let count = 0;

  for (let i = 0; i < students.length; i++)
    for (let j = 0; j < students[i].grades.length; j++) {
      totalGrade += students[i].grades[j];
      count++;
    }
  let averageGrade = totalGrade / count;
  return averageGrade;
}

//enum grade level

enum gradeLevel {
  FRESHMAN = "Freshman",
  SOPHOMORE = "Sophomore",
  JUNIOR = "Junior",
  SENIOR = "Senior",
}

//function getGradeLevel

function getGradeLevel(age: number): gradeLevel {
  switch (age) {
    case 15:
      return gradeLevel.FRESHMAN;
      break;
    case 16:
      return gradeLevel.SOPHOMORE;
      break;
    case 17:
      return gradeLevel.JUNIOR;
      break;
    case 18:
      return gradeLevel.SENIOR;
      break;
    default:
      throw console.error("The student is nt in high school");
  }
}

//course interface

interface Course {
  id: number;
  name: string;
  students: Student[];
  instructor: string;
  maxStudents: number;
}

class CourseManager {
  private courses: Course[] = [];

  public addCourse(course: Course): void {
    this.courses.push(course);
  }

  public removeCouse(courseId: number): void {
    this.courses = this.courses.filter((course) => course.id !== courseId);
  }

  public getCoursesById(courseId: number): Course | undefined {
    let foundCourse = this.courses.find((course) => course.id === courseId);
    return foundCourse;
  }

  public getAllCourses(): Course[] {
    return this.courses;
  }
}

//return top students
function returnTopStudents(
  courseManager: CourseManager,
  courseId: number,
  N: number
): Student[] {
  const course = courseManager.getCoursesById(courseId);

  if (!course) {
    console.log("The course doesn't exist");
    return [];
  }

  const students = course.students;

  function getAverage(grades: number[]): number {
    if (grades.length === 0) return 0;

    let sum = 0;
    for (let grade of grades) {
      sum += grade;
    }
    return sum / grades.length;
  }

  students.sort((a, b) => {
    const studentA = getAverage(a.grades);
    const studentB = getAverage(b.grades);
    return studentB - studentA;
  });

  return students.slice(0, N);
}

// Test data srudents
const students: Student[] = [
  { id: 1, name: "Alice", age: 15, grades: [85, 90, 88] },
  { id: 2, name: "Bob", age: 16, grades: [78, 80, 82] },
  { id: 3, name: "Charlie", age: 17, grades: [92, 95, 90] },
  { id: 4, name: "David", age: 18, grades: [60, 65, 70] },
  { id: 5, name: "Eve", age: 15, grades: [88, 85, 84] },
];

// Test data courses
const courses: Course[] = [
  {
    id: 101,
    name: "Physics",
    instructor: "Dr. Smith",
    maxStudents: 30,
    students: [students[0], students[1], students[2]],
  },
  {
    id: 102,
    name: "Mathematics",
    instructor: "Dr. Brown",
    maxStudents: 25,
    students: [students[1], students[3], students[4]],
  },
];

//course manager
const courseManager = new CourseManager();
//add
courseManager.addCourse(courses[0]);
courseManager.addCourse(courses[1]);
//get by id
console.log("Find first course by id", courseManager.getCoursesById(101));
console.log("Find second course by id", courseManager.getCoursesById(102));
//get all
console.log("Get all courses");
console.log(courseManager.getAllCourses());
//remove course
console.log("Get all courses after removing course");
courseManager.removeCouse(101);
console.log(courseManager.getAllCourses());

//average grade
const average = averageGrade(students);
console.log(`Average grade: ${average}`);

//grade level
const gradeLevelAlice = getGradeLevel(students[0].age);
console.log("Grade Level of Alice:", gradeLevelAlice);

//top sudents
const topStudents = returnTopStudents(courseManager, 102, 3);
console.log("Top 3 students in Mathematics:");
console.log(topStudents);
