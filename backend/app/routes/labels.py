from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List
from app.models.data_models import Label
from app.routes.dto import LabelDto


from .__init__ import get_session

router = APIRouter()


@router.post("/", response_model=Label, status_code=201)
async def create_label(label: LabelDto, session: AsyncSession = Depends(get_session)):
    label = Label(**label.model_dump())
    session.add(label)
    try:
        await session.commit()
        await session.refresh(label)
        return label
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[Label])
async def list_labels(session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(Label))
    return result.all()


@router.put("/{label_id}", response_model=Label)
async def update_label(
    label_id: int, updated_label: LabelDto, session: AsyncSession = Depends(get_session)
):
    label = await session.get(Label, label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    label.name = updated_label.name
    try:
        session.add(label)
        await session.commit()
        await session.refresh(label)
        return label
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{label_id}", status_code=204)
async def delete_label(label_id: int, session: AsyncSession = Depends(get_session)):
    label = await session.get(Label, label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    await session.delete(label)
    await session.commit()
