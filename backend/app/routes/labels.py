from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select, Session
from typing import List
from app.models.data_models import Label
from app.routes.dto import LabelDto


from .__init__ import get_session

router = APIRouter()


@router.post("/", response_model=Label, status_code=201)
def create_label(label: LabelDto, session: Session = Depends(get_session)):
    label = Label(**label.model_dump())
    session.add(label)
    try:
        session.commit()
        session.refresh(label)
        return label
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[Label])
def list_labels(session: Session = Depends(get_session)):
    result = session.exec(select(Label))
    return result.all()


@router.put("/{label_id}", response_model=Label)
def update_label(
    label_id: int, updated_label: LabelDto, session: Session = Depends(get_session)
):
    label = session.get(Label, label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    label.name = updated_label.name
    try:
        session.add(label)
        session.commit()
        session.refresh(label)
        return label
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{label_id}", status_code=204)
def delete_label(label_id: int, session: Session = Depends(get_session)):
    label = session.get(Label, label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    session.delete(label)
    session.commit()
