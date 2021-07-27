const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
  let courses = await Course.find()
            .populate('userId', 'email name')
            .select('price title img');
  courses = courses.map(c => c.toJSON());

  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses
  });
});

router.get('/:id/edit', async (req, res) => {
  if(!req.query.allow) {
    return res.redirect('/');
  }
  let course = await Course.findById(req.params.id);
  course = course.toJSON();

  res.render('course-edit', {
    title: `Edit ${course.title}`, 
    course
  });
});

router.post('/edit', async (req, res) => {
  const {id} = req.body;
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect('/courses');
}); 

router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect('/courses');
  } catch (e) {
    consoel.log(e);
  }
});

router.get('/:id', async (req, res) => {
  let course = await Course.findById(req.params.id);
  course = course.toJSON();

  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course
  });
});

module.exports = router;