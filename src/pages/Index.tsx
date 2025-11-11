import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  classId: string;
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  grade: number;
  date: string;
  note: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Homework {
  id: string;
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
}

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem('classes');
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "5-А", students: [] },
      { id: "2", name: "6-Б", students: [] },
    ];
  });
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "Иванов Иван", classId: "1" },
      { id: "2", name: "Петрова Мария", classId: "1" },
      { id: "3", name: "Сидоров Петр", classId: "2" },
    ];
  });
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "Математика" },
      { id: "2", name: "Русский язык" },
      { id: "3", name: "История" },
    ];
  });
  const [grades, setGrades] = useState<Grade[]>(() => {
    const saved = localStorage.getItem('grades');
    return saved ? JSON.parse(saved) : [
      { id: "1", studentId: "1", subjectId: "1", grade: 5, date: "2025-11-11", note: "Отлично" },
      { id: "2", studentId: "1", subjectId: "2", grade: 4, date: "2025-11-11", note: "" },
    ];
  });
  const [homework, setHomework] = useState<Homework[]>(() => {
    const saved = localStorage.getItem('homework');
    return saved ? JSON.parse(saved) : [
      { id: "1", classId: "1", subjectId: "1", title: "Решить задачи", description: "Стр. 45, №1-5", dueDate: "2025-11-15" },
    ];
  });

  const [newClassName, setNewClassName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [importText, setImportText] = useState("");
  
  const [gradeClassId, setGradeClassId] = useState("");
  const [gradeSubjectId, setGradeSubjectId] = useState("");
  const [gradeDate, setGradeDate] = useState(new Date().toISOString().split("T")[0]);
  const [gradeNote, setGradeNote] = useState("");
  const [tempGrades, setTempGrades] = useState<Record<string, number>>({});

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  useEffect(() => {
    localStorage.setItem('homework', JSON.stringify(homework));
  }, [homework]);

  const handleLogin = () => {
    if (password === "22") {
      setIsAuthenticated(true);
      toast.success("Успешный вход");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const addClass = () => {
    if (newClassName.trim()) {
      const newClass: Class = {
        id: Date.now().toString(),
        name: newClassName,
        students: [],
      };
      setClasses([...classes, newClass]);
      setNewClassName("");
      toast.success("Класс добавлен");
    }
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    setStudents(students.filter((s) => s.classId !== id));
    toast.success("Класс удален");
  };

  const addStudent = () => {
    if (newStudentName.trim() && selectedClassId) {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: newStudentName,
        classId: selectedClassId,
      };
      setStudents([...students, newStudent]);
      setNewStudentName("");
      toast.success("Ученик добавлен");
    }
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    setGrades(grades.filter((g) => g.studentId !== id));
    toast.success("Ученик удален");
  };

  const addSubject = () => {
    if (newSubjectName.trim()) {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: newSubjectName,
      };
      setSubjects([...subjects, newSubject]);
      setNewSubjectName("");
      toast.success("Предмет добавлен");
    }
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
    setGrades(grades.filter((g) => g.subjectId !== id));
    toast.success("Предмет удален");
  };

  const addGrade = (studentId: string, subjectId: string, grade: number, note: string) => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      studentId,
      subjectId,
      grade,
      date: new Date().toISOString().split("T")[0],
      note,
    };
    setGrades([...grades, newGrade]);
    toast.success("Оценка добавлена");
  };

  const deleteGrade = (id: string) => {
    setGrades(grades.filter((g) => g.id !== id));
    toast.success("Оценка удалена");
  };

  const getAverageGrade = (studentId: string) => {
    const studentGrades = grades.filter((g) => g.studentId === studentId);
    if (studentGrades.length === 0) return "-";
    const sum = studentGrades.reduce((acc, g) => acc + g.grade, 0);
    return (sum / studentGrades.length).toFixed(2);
  };

  const importStudents = () => {
    const lines = importText.split("\n").filter((line) => line.trim());
    const newStudents = lines.map((line) => ({
      id: Date.now().toString() + Math.random(),
      name: line.trim(),
      classId: selectedClassId,
    }));
    setStudents([...students, ...newStudents]);
    setImportText("");
    toast.success(`Импортировано учеников: ${newStudents.length}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Помощник учителя</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Введите пароль"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-foreground text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Помощник учителя</h1>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="bg-white text-foreground hover:bg-gray-100">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-md">
            <TabsTrigger value="classes" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="School" size={18} className="mr-2" />
              Классы
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="ClipboardList" size={18} className="mr-2" />
              Оценки
            </TabsTrigger>
            <TabsTrigger value="homework" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Домашние задания
            </TabsTrigger>
            <TabsTrigger value="subjects" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Library" size={18} className="mr-2" />
              Предметы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="School" size={24} />
                  Управление классами
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Название класса"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                  />
                  <Button onClick={addClass}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {classes.map((cls) => (
                    <Card key={cls.id} className="border-2 hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteClass(cls.id)}
                        >
                          <Icon name="Trash2" size={18} className="text-destructive" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Учеников: {students.filter((s) => s.classId === cls.id).length}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Ученики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                  >
                    <option value="">Выберите класс</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="ФИО ученика"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                  />
                  <Button onClick={addStudent}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Icon name="Upload" size={18} className="mr-2" />
                        Импорт
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Импорт учеников</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Класс</Label>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                          >
                            <option value="">Выберите класс</option>
                            {classes.map((cls) => (
                              <option key={cls.id} value={cls.id}>
                                {cls.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Список учеников (по одному на строку)</Label>
                          <Textarea
                            placeholder="Иванов Иван&#10;Петрова Мария&#10;Сидоров Петр"
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            rows={10}
                          />
                        </div>
                        <Button onClick={importStudents} className="w-full">
                          Импортировать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Класс</TableHead>
                      <TableHead>Средний балл</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          {classes.find((c) => c.id === student.classId)?.name}
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-primary">{getAverageGrade(student.id)}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <Icon name="Trash2" size={18} className="text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ClipboardList" size={24} />
                  Выставление оценок
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Класс</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={gradeClassId}
                      onChange={(e) => {
                        setGradeClassId(e.target.value);
                        setTempGrades({});
                      }}
                    >
                      <option value="">Выберите класс</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Предмет</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={gradeSubjectId}
                      onChange={(e) => setGradeSubjectId(e.target.value)}
                    >
                      <option value="">Выберите предмет</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Дата</Label>
                    <Input
                      type="date"
                      value={gradeDate}
                      onChange={(e) => setGradeDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Примечание (общее для всех)</Label>
                  <Input
                    placeholder="Контрольная работа, домашнее задание и т.д."
                    value={gradeNote}
                    onChange={(e) => setGradeNote(e.target.value)}
                  />
                </div>

                {gradeClassId && gradeSubjectId && (
                  <div className="space-y-4">
                    <Card className="border-2 border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {classes.find((c) => c.id === gradeClassId)?.name} • {subjects.find((s) => s.id === gradeSubjectId)?.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{gradeDate} {gradeNote && `• ${gradeNote}`}</p>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50%]">Ученик</TableHead>
                              <TableHead>Оценка</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {students
                              .filter((s) => s.classId === gradeClassId)
                              .map((student) => (
                                <TableRow key={student.id}>
                                  <TableCell className="font-medium">{student.name}</TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      {[1, 2, 3, 4, 5].map((grade) => (
                                        <Button
                                          key={grade}
                                          variant={tempGrades[student.id] === grade ? "default" : "outline"}
                                          size="sm"
                                          className="w-10 h-10"
                                          onClick={() => setTempGrades({ ...tempGrades, [student.id]: grade })}
                                        >
                                          {grade}
                                        </Button>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                        <Button
                          className="w-full mt-4"
                          onClick={() => {
                            const newGrades = Object.entries(tempGrades).map(([studentId, grade]) => ({
                              id: Date.now().toString() + Math.random(),
                              studentId,
                              subjectId: gradeSubjectId,
                              grade,
                              date: gradeDate,
                              note: gradeNote,
                            }));
                            setGrades([...grades, ...newGrades]);
                            setTempGrades({});
                            toast.success(`Добавлено оценок: ${newGrades.length}`);
                          }}
                          disabled={Object.keys(tempGrades).length === 0}
                        >
                          <Icon name="Save" size={18} className="mr-2" />
                          Сохранить оценки ({Object.keys(tempGrades).length})
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">История оценок</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {students
                            .filter((s) => s.classId === gradeClassId)
                            .map((student) => {
                              const studentGrades = grades
                                .filter((g) => g.studentId === student.id && g.subjectId === gradeSubjectId)
                                .sort((a, b) => b.date.localeCompare(a.date));
                              
                              if (studentGrades.length === 0) return null;
                              
                              return (
                                <div key={student.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50">
                                  <div className="flex-1 font-medium">{student.name}</div>
                                  <div className="flex gap-2 flex-wrap">
                                    {studentGrades.map((grade) => (
                                      <div
                                        key={grade.id}
                                        className="group relative"
                                      >
                                        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-md">
                                          <span className="font-bold text-lg text-primary">{grade.grade}</span>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => deleteGrade(grade.id)}
                                          >
                                            <Icon name="X" size={14} className="text-destructive" />
                                          </Button>
                                        </div>
                                        <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                          {grade.date} {grade.note && `• ${grade.note}`}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" size={24} />
                  Домашние задания
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить задание
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новое домашнее задание</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newHw: Homework = {
                          id: Date.now().toString(),
                          classId: formData.get("class") as string,
                          subjectId: formData.get("subject") as string,
                          title: formData.get("title") as string,
                          description: formData.get("description") as string,
                          dueDate: formData.get("dueDate") as string,
                        };
                        setHomework([...homework, newHw]);
                        toast.success("Домашнее задание добавлено");
                        e.currentTarget.reset();
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label>Класс</Label>
                        <select
                          name="class"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Предмет</Label>
                        <select
                          name="subject"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input name="title" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Описание</Label>
                        <Textarea name="description" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Срок сдачи</Label>
                        <Input name="dueDate" type="date" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Создать
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <div className="grid gap-4 md:grid-cols-2">
                  {homework.map((hw) => (
                    <Card key={hw.id} className="border-2">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{hw.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {classes.find((c) => c.id === hw.classId)?.name} •{" "}
                              {subjects.find((s) => s.id === hw.subjectId)?.name}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Icon name="Pencil" size={18} className="text-primary" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Редактировать задание</DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const updatedHw: Homework = {
                                      id: hw.id,
                                      classId: formData.get("class") as string,
                                      subjectId: formData.get("subject") as string,
                                      title: formData.get("title") as string,
                                      description: formData.get("description") as string,
                                      dueDate: formData.get("dueDate") as string,
                                    };
                                    setHomework(homework.map((h) => (h.id === hw.id ? updatedHw : h)));
                                    toast.success("Задание обновлено");
                                  }}
                                  className="space-y-4"
                                >
                                  <div className="space-y-2">
                                    <Label>Класс</Label>
                                    <select
                                      name="class"
                                      required
                                      defaultValue={hw.classId}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                      {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                          {cls.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Предмет</Label>
                                    <select
                                      name="subject"
                                      required
                                      defaultValue={hw.subjectId}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                      {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                          {subject.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Название</Label>
                                    <Input name="title" required defaultValue={hw.title} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Описание</Label>
                                    <Textarea name="description" required defaultValue={hw.description} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Срок сдачи</Label>
                                    <Input name="dueDate" type="date" required defaultValue={hw.dueDate} />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Сохранить изменения
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setHomework(homework.filter((h) => h.id !== hw.id));
                                toast.success("Задание удалено");
                              }}
                            >
                              <Icon name="Trash2" size={18} className="text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3">{hw.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Calendar" size={16} />
                          <span>Срок: {hw.dueDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Library" size={24} />
                  Предметы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Название предмета"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                  />
                  <Button onClick={addSubject}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => (
                    <Card key={subject.id} className="border-2 hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteSubject(subject.id)}
                        >
                          <Icon name="Trash2" size={18} className="text-destructive" />
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}