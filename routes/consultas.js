const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (_req, res) => {
  db.all('SELECT * FROM consultas ORDER BY date(data), time(hora)', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { paciente, profissional, data, hora } = req.body;
  if (!paciente || !profissional || !data || !hora) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }
  db.run('INSERT INTO consultas (paciente, profissional, data, hora) VALUES (?, ?, ?, ?)',
    [paciente, profissional, data, hora],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

router.put('/:id/cancelar', (req, res) => {
  const id = req.params.id;
  db.run('UPDATE consultas SET status = "Cancelada" WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, status: 'Cancelada' });
  });
});

module.exports = router;
