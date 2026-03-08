import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
    bg:         '#0d1117',
    surface:    '#161b22',
    surfaceAlt: '#1c2128',
    border:     '#30363d',
    accent:     '#58a6ff',
    accentDim:  'rgba(88,166,255,0.12)',
    success:    '#3fb950',
    successDim: 'rgba(63,185,80,0.12)',
    warning:    '#d29922',
    warningDim: 'rgba(210,153,34,0.12)',
    danger:     '#f85149',
    dangerDim:  'rgba(248,81,73,0.10)',
    text:       '#e6edf3',
    textMuted:  '#8b949e',
    textFaint:  '#484f58',
};

// ─── AVATAR STYLE ──────────────────────────────────────────────────────────────
const AvatarStyle = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: 'white',
    marginRight: 10,
    flexShrink: 0
};

// ─── FEE DATA WITH AVATARS ─────────────────────────────────────────────────────
const FEE_DATA = [
    { id: 1, avatarColor: '#58a6ff', avatarInitials: 'AM', student: 'Arjun Mathur', feeType: 'Sports', amount: 5000, paid: 3000, balance: 2000, date: '01/2026', method: 'Cash', status: 'Pending' },
    { id: 2, avatarColor: '#f85149', avatarInitials: 'PS', student: 'Priya Sen', feeType: 'Library', amount: 5000, paid: 4000, balance: 1000, date: '02/2026', method: 'Cheque', status: 'Partial' },
    { id: 3, avatarColor: '#3fb950', avatarInitials: 'VK', student: 'Vijay Kumar', feeType: 'Tuition', amount: 2500, paid: 2500, balance: 0, date: '03/2026', method: 'Cash', status: 'Paid' },
];

// ─── TEACHER SALARY DATA WITH AVATARS ──────────────────────────────────────────
const TEACHER_DATA = [
    { id: 1, avatarColor: '#db6d28', avatarInitials: 'AS', name: 'Anjali Singh', idCode: 'T-001', designation: 'Lecturer', subject: 'Maths', salary: 45000, paid: 30000, balance: 15000, date: '01/2026', method: 'Bank', status: 'Pending' },
    { id: 2, avatarColor: '#58a6ff', avatarInitials: 'RK', name: 'Rajesh Kumar', idCode: 'T-002', designation: 'Asst Prof', subject: 'Language', salary: 42000, paid: 42000, balance: 0, date: '02/2026', method: 'Bank', status: 'Paid' },
    { id: 3, avatarColor: '#f85149', avatarInitials: 'PS', name: 'Priya Sharma', idCode: 'T-003', designation: 'Sr Teacher', subject: 'Comp Science', salary: 38000, paid: 25000, balance: 13000, date: '03/2026', method: 'Cash', status: 'Partial' },
];

// ─── STUDENT REQUESTS DATA (REGISTRATIONS ONLY) ────────────────────────────────
const STUDENT_REQUESTS = [
    { id: 1, avatarColor: '#58a6ff', avatarInitials: 'RS', name: 'Rahul Sharma', class: '10th A', date: '02/2026', status: 'Pending' },
    { id: 2, avatarColor: '#f85149', avatarInitials: 'PS', name: 'Priya Singh', class: '11th B', date: '02/2026', status: 'Pending' },
    { id: 3, avatarColor: '#3fb950', avatarInitials: 'AK', name: 'Amit Kumar', class: '12th C', date: '02/2026', status: 'Pending' },
];

// ─── UNIFORM BUTTON STYLE ──────────────────────────────────────────────────────
const ButtonStyle = {
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    minWidth: '60px'
};

// ─── FEES TABLE ────────────────────────────────────────────────────────────────
function FeesTable() {
    const [fees, setFees] = useState(FEE_DATA);
    const [editingFee, setEditingFee] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);

    const handlePartialPayment = () => {
        if (paymentAmount > 0 && paymentAmount <= editingFee.balance) {
            setFees(fees.map(fee => 
                fee.id === editingFee.id
                    ? {
                        ...fee,
                        paid: fee.paid + paymentAmount,
                        balance: fee.amount - (fee.paid + paymentAmount),
                        status: (fee.paid + paymentAmount) >= fee.amount ? 'Paid' : 'Partial',
                        method: 'Cash'
                    }
                    : fee
            ));
            setEditingFee(null);
            setPaymentAmount(0);
        }
    };

    return (
        <>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
                                {['Student', 'Fee Type', 'Amount', 'Paid', 'Balance', 'Date', 'Method', 'Status', 'Action']
                                    .map((h, i) => (
                                        <th key={h} style={{
                                            padding: '11px 16px',
                                            textAlign: i > 1 && i < 7 ? 'right' : i === 8 ? 'center' : 'left',
                                            fontSize: 11, fontWeight: 700, color: C.textMuted,
                                            letterSpacing: '0.07em', textTransform: 'uppercase',
                                            fontFamily: "'DM Sans', sans-serif",
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, idx) => (
                                <tr key={fee.id} style={{
                                    borderBottom: idx < fees.length - 1 ? `1px solid ${C.border}` : 'none',
                                    background: 'transparent',
                                    transition: 'background 0.15s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 600, color: C.text }}>
                                            <div style={{ ...AvatarStyle, background: fee.avatarColor }}>
                                                {fee.avatarInitials}
                                            </div>
                                            {fee.student}
                                        </div>
                                    </td>
                                    <td style={{ padding: '13px 16px', color: C.textMuted }}>{fee.feeType}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.text }}>₹{fee.amount.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.success }}>₹{fee.paid.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: fee.balance > 0 ? C.danger : C.success, fontWeight: fee.balance > 0 ? 700 : 500 }}>₹{fee.balance.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.textMuted }}>{fee.date}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.textMuted }}>{fee.method}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                        <span style={{
                                            background: fee.status === 'Paid' ? C.success+'20' : fee.status === 'Partial' ? C.warning+'20' : C.danger+'20',
                                            color: fee.status === 'Paid' ? C.success : fee.status === 'Partial' ? C.warning : C.danger,
                                            padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600
                                        }}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                            <button onClick={() => setEditingFee(fee)} style={{
                                                ...ButtonStyle,
                                                background: C.accent,
                                                color: 'white'
                                            }}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FEE EDIT MODAL */}
            {editingFee && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
                    onClick={e => e.target === e.currentTarget && setEditingFee(null)}
                >
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', width: '420px' }}>
                        <h3 style={{ color: C.text, fontSize: '18px', fontWeight: '700', marginBottom: 20 }}>Edit Payment - {editingFee.student}</h3>
                        <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                            <div>Total: ₹{editingFee.amount.toLocaleString()}</div>
                            <div>Paid: ₹{editingFee.paid.toLocaleString()}</div>
                            <div style={{ color: C.danger, fontWeight: 600 }}>Balance: ₹{editingFee.balance.toLocaleString()}</div>
                        </div>
                        <input 
                            type="number" 
                            value={paymentAmount} 
                            onChange={e => setPaymentAmount(Number(e.target.value))}
                            min="1" 
                            max={editingFee.balance} 
                            placeholder="Enter payment amount"
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                background: C.bg, 
                                border: `1px solid ${C.border}`, 
                                borderRadius: '8px', 
                                color: C.text, 
                                marginBottom: '20px',
                                fontSize: '14px'
                            }} 
                        />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingFee(null)} style={{ 
                                padding: '10px 20px', 
                                background: C.bg, 
                                border: `1px solid ${C.border}`, 
                                color: C.text, 
                                borderRadius: '8px', 
                                cursor: 'pointer' 
                            }}>
                                Cancel
                            </button>
                            <button onClick={handlePartialPayment} disabled={paymentAmount <= 0} style={{
                                padding: '10px 20px', 
                                background: C.accent, 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: 'pointer', 
                                opacity: paymentAmount <= 0 ? 0.5 : 1
                            }}>
                                Update Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── TEACHERS SALARY TABLE ─────────────────────────────────────────────────────
function TeachersSalaryTable() {
    const [teachers, setTeachers] = useState(TEACHER_DATA);
    const [editingSalary, setEditingSalary] = useState(null);
    const [salaryAmount, setSalaryAmount] = useState(0);

    const handleSalaryPayment = () => {
        if (salaryAmount > 0 && salaryAmount <= editingSalary.balance) {
            setTeachers(teachers.map(t => 
                t.id === editingSalary.id
                    ? {
                        ...t,
                        paid: t.paid + salaryAmount,
                        balance: t.salary - (t.paid + salaryAmount),
                        status: (t.paid + salaryAmount) >= t.salary ? 'Paid' : 'Partial',
                        method: 'Bank'
                    }
                    : t
            ));
            setEditingSalary(null);
            setSalaryAmount(0);
        }
    };

    return (
        <>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', marginTop: 20 }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
                                {['Teacher', 'ID', 'Designation', 'Subject', 'Salary', 'Paid', 'Balance', 'Date', 'Method', 'Status', 'Action']
                                    .map((h, i) => (
                                        <th key={h} style={{
                                            padding: '11px 16px',
                                            textAlign: i > 3 ? 'right' : i === 10 ? 'center' : 'left',
                                            fontSize: 11, fontWeight: 700, color: C.textMuted,
                                            letterSpacing: '0.07em', textTransform: 'uppercase',
                                            fontFamily: "'DM Sans', sans-serif",
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher, idx) => (
                                <tr key={teacher.id} style={{
                                    borderBottom: idx < teachers.length - 1 ? `1px solid ${C.border}` : 'none',
                                    background: 'transparent',
                                    transition: 'background 0.15s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 600, color: C.text }}>
                                            <div style={{ ...AvatarStyle, background: teacher.avatarColor }}>
                                                {teacher.avatarInitials}
                                            </div>
                                            {teacher.name}
                                        </div>
                                    </td>
                                    <td style={{ padding: '13px 16px', color: C.textMuted }}>{teacher.idCode}</td>
                                    <td style={{ padding: '13px 16px', color: C.textMuted }}>{teacher.designation}</td>
                                    <td style={{ padding: '13px 16px', color: C.textMuted }}>{teacher.subject}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.text }}>₹{teacher.salary.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.success }}>₹{teacher.paid.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: teacher.balance > 0 ? C.danger : C.success, fontWeight: teacher.balance > 0 ? 700 : 500 }}>₹{teacher.balance.toLocaleString()}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.textMuted }}>{teacher.date}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', color: C.textMuted }}>{teacher.method}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                        <span style={{
                                            background: teacher.status === 'Paid' ? C.success+'20' : teacher.status === 'Partial' ? C.warning+'20' : C.danger+'20',
                                            color: teacher.status === 'Paid' ? C.success : teacher.status === 'Partial' ? C.warning : C.danger,
                                            padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600
                                        }}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                            <button onClick={() => setEditingSalary(teacher)} style={{
                                                ...ButtonStyle,
                                                background: C.accent,
                                                color: 'white'
                                            }}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SALARY EDIT MODAL */}
            {editingSalary && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}
                    onClick={e => e.target === e.currentTarget && setEditingSalary(null)}
                >
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', width: '420px' }}>
                        <h3 style={{ color: C.text, fontSize: '18px', fontWeight: '700', marginBottom: 20 }}>Edit Salary - {editingSalary.name}</h3>
                        <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                            <div>Total Salary: ₹{editingSalary.salary.toLocaleString()}</div>
                            <div>Paid: ₹{editingSalary.paid.toLocaleString()}</div>
                            <div style={{ color: C.danger, fontWeight: 600 }}>Balance: ₹{editingSalary.balance.toLocaleString()}</div>
                        </div>
                        <input 
                            type="number" 
                            value={salaryAmount} 
                            onChange={e => setSalaryAmount(Number(e.target.value))}
                            min="1" 
                            max={editingSalary.balance} 
                            placeholder="Enter payment amount"
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                background: C.bg, 
                                border: `1px solid ${C.border}`, 
                                borderRadius: '8px', 
                                color: C.text, 
                                marginBottom: '20px',
                                fontSize: '14px'
                            }} 
                        />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingSalary(null)} style={{ 
                                padding: '10px 20px', 
                                background: C.bg, 
                                border: `1px solid ${C.border}`, 
                                color: C.text, 
                                borderRadius: '8px', 
                                cursor: 'pointer' 
                            }}>
                                Cancel
                            </button>
                            <button onClick={handleSalaryPayment} disabled={salaryAmount <= 0} style={{
                                padding: '10px 20px', 
                                background: C.accent, 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: 'pointer', 
                                opacity: salaryAmount <= 0 ? 0.5 : 1
                            }}>
                                Update Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── STUDENT REGISTRATION REQUESTS TABLE ───────────────────────────────────────
function StudentRequestsTable() {
    const [requests, setRequests] = useState(STUDENT_REQUESTS);

    const approveRequest = (requestId) => {
        setRequests(requests.map(req => 
            req.id === requestId 
                ? { ...req, status: 'Approved' }
                : req
        ));
    };

    const rejectRequest = (requestId) => {
        setRequests(requests.map(req => 
            req.id === requestId 
                ? { ...req, status: 'Rejected' }
                : req
        ));
    };

    return (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
                            {['Student', 'Class', 'Date', 'Status', 'Action']
                                .map((h, i) => (
                                    <th key={h} style={{
                                        padding: '11px 16px',
                                        textAlign: i > 1 && i < 3 ? 'right' : i === 4 ? 'center' : 'left',
                                        fontSize: 11, fontWeight: 700, color: C.textMuted,
                                        letterSpacing: '0.07em', textTransform: 'uppercase',
                                        fontFamily: "'DM Sans', sans-serif",
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {h}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, idx) => (
                            <tr key={request.id} style={{
                                borderBottom: idx < requests.length - 1 ? `1px solid ${C.border}` : 'none',
                                background: 'transparent',
                                transition: 'background 0.15s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '13px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 600, color: C.text }}>
                                        <div style={{ ...AvatarStyle, background: request.avatarColor }}>
                                            {request.avatarInitials}
                                        </div>
                                        {request.name}
                                    </div>
                                </td>
                                <td style={{ padding: '13px 16px', color: C.textMuted }}>{request.class}</td>
                                <td style={{ padding: '13px 16px', textAlign: 'right', color: C.textMuted }}>{request.date}</td>
                                <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                    <span style={{
                                        background: request.status === 'Approved' ? C.success+'20' : request.status === 'Rejected' ? C.danger+'20' : C.warning+'20',
                                        color: request.status === 'Approved' ? C.success : request.status === 'Rejected' ? C.danger : C.warning,
                                        padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600
                                    }}>
                                        {request.status}
                                    </span>
                                </td>
                                <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                        {request.status === 'Pending' ? (
                                            <>
                                                <button onClick={() => approveRequest(request.id)} style={{
                                                    ...ButtonStyle,
                                                    background: C.success,
                                                    color: 'white'
                                                }}>✓ Approve</button>
                                                <button onClick={() => rejectRequest(request.id)} style={{
                                                    ...ButtonStyle,
                                                    background: C.danger,
                                                    color: 'white'
                                                }}>✗ Reject</button>
                                            </>
                                        ) : (
                                            <span style={{ color: C.textMuted, fontSize: 11 }}>Complete</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function AdminDashboardHome({ user }) {
    const location = useLocation();

    const isRegistration = location.pathname.includes('/registration');
    const isDashboard = !isRegistration;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, padding: '20px' }}>

            {/* Registration View */}
            {isRegistration && (
                <div>
                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 20,
                        fontWeight: 800,
                        color: C.text,
                        letterSpacing: '-0.02em',
                        marginBottom: 20
                    }}>
                        New Admission Approvals
                    </h2>

                    <StudentRequestsTable />
                </div>
            )}

            {/* Dashboard View */}
            {isDashboard && (
                <>
                    <div>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 20,
                            fontWeight: 800,
                            color: C.text,
                            letterSpacing: '-0.02em',
                            marginBottom: 20
                        }}>
                            Fee Management
                        </h2>
                        <FeesTable />
                    </div>

                    <div>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 20,
                            fontWeight: 800,
                            color: C.text,
                            letterSpacing: '-0.02em',
                            marginBottom: 20
                        }}>
                            Teachers & Staff Salary
                        </h2>
                        <TeachersSalaryTable />
                    </div>
                </>
            )}

        </div>
    );
}
